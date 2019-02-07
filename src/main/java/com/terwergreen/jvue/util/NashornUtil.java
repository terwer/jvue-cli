package com.terwergreen.jvue.util;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.script.ScriptContext;
import javax.script.ScriptException;
import javax.script.SimpleScriptContext;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

/**
 * Nashorn工具类
 *
 * @author Terwer
 * @version 1.0
 * 2019/1/20 22:35
 **/
public class NashornUtil {
    private static final Logger logger = LoggerFactory.getLogger(NashornUtil.class);
    private static NashornUtil nashornUtil;
    private final NashornScriptEngine engine;
    private static ScriptContext sc = new SimpleScriptContext();
    private static ScheduledExecutorService globalScheduledThreadPool = Executors.newScheduledThreadPool(20);

    /**
     * Vue资源文件目录
     */
    private static final String LIB_DIR = "static/lib";

    public static synchronized NashornUtil getInstance() {
        if (nashornUtil == null) {
            long start = System.currentTimeMillis();
            nashornUtil = new NashornUtil();
            long end = System.currentTimeMillis();
            logger.info("Init NashornScriptEngine cost time {} ms", (end - start));
        }

        return nashornUtil;
    }

    private NashornUtil() {
        // 获取Javascript引擎
        NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
        engine = (NashornScriptEngine) factory.getScriptEngine(new String[]{"--language=es6"});
        sc.setBindings(engine.createBindings(), ScriptContext.ENGINE_SCOPE);
        sc.setAttribute("__IS_SSR__", true, ScriptContext.ENGINE_SCOPE);
        sc.setAttribute("__NASHORN_POLYFILL_TIMER__", globalScheduledThreadPool, ScriptContext.ENGINE_SCOPE);
        engine.setBindings(sc.getBindings(ScriptContext.ENGINE_SCOPE), ScriptContext.ENGINE_SCOPE);

        try {
            // 编译global-polyfill
            engine.eval(read(LIB_DIR + File.separator + "global-polyfill.js"));
            logger.info("polyfill global finish");

            // 编译process
            engine.eval("var process = { env: { VUE_ENV: \"server\", NODE_ENV: \"production\" }}; this.global = { process: process };");
            logger.info("polyfill process finish");

            // 编译promise
            engine.eval("load('classpath:net/arnx/nashorn/lib/promise.js')");
            logger.info("polyfill promise finish");

            // 编译setTimeout
            engine.eval(read(LIB_DIR + File.separator + "setTimeout-nashorn.js"));
            logger.info("polyfill setTimeout finish");

            // 编译Vue server
            engine.eval(VueUtil.readVueFile("app.js"));
            logger.info("Vue server编译成功，编译引擎为Nashorn");

            logger.info("nashorn-polyfill编译成功，编译引擎为Nashorn");
        } catch (ScriptException e) {
            logger.error("nashorn-polyfill解析错误", e);
        }
    }

    public Object eval(Reader reader) {
        try {
            return engine.eval(reader);
        } catch (ScriptException e) {
            logger.error("script compiled error", e);
            return null;
        }
    }

    public Object eval(String script) {
        try {
            return engine.eval(script);
        } catch (ScriptException e) {
            logger.error("script compiled error", e);
            return null;
        }
    }

    public ScriptObjectMirror getGlobalGlobalMirrorObject(String objectName) {
        return (ScriptObjectMirror) engine.getBindings(ScriptContext.ENGINE_SCOPE).get(objectName);
    }

    public Object callRender(String methodName, Object... input) {
        try {
            return engine.invokeFunction(methodName, input);
        } catch (ScriptException e) {
            logger.error("run javascript failed.", e);
            return null;
        } catch (NoSuchMethodException e) {
            logger.error("no such method.", e);
            return null;
        }
    }

    private static Reader read(String path) {
        InputStream in = NashornUtil.class.getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }

    public static void main(String[] args) {
        NashornUtil engine = NashornUtil.getInstance();

        // engine.eval("function test(){let num=2;console.log(\"num is:\"+num);return num;}");
        // Object result = engine.callRender("test");

        try {
            InputStreamReader reader = new FileReader("C:\\Users\\Terwer\\IdeaProjects\\next\\src\\main\\webapp\\ssrdist\\js\\server-bundle.js");
            Object call = engine.eval(reader);
            logger.info("call = " + call);
            Object result = engine.callRender("renderServer");
            logger.info("result = " + result);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }
}
