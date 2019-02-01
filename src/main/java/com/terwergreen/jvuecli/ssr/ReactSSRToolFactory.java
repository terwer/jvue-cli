package com.terwergreen.jvuecli.ssr;

import org.apache.commons.collections.map.HashedMap;
import org.moqui.context.ExecutionContextFactory;
import org.moqui.context.ToolFactory;
import org.moqui.resource.ResourceReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReactSSRToolFactory implements ToolFactory<React> {

    private final static Logger logger = LoggerFactory.getLogger(ReactSSRToolFactory.class);
    private final static String TOOL_NAME = "ReactSSR";

    private ExecutionContextFactory ecf = null;

    private final Map<String, React> reactMap = new HashMap<>();

    private final Lock l = new ReentrantLock();
    /**
     * Default empty constructor
     */
    ReactSSRToolFactory() {
    }

    @Override
    public String getName() {
        return TOOL_NAME;
    }

    @Override
    public void init(ExecutionContextFactory ecf) {
        this.ecf = ecf;
        logger.info("ReactSSRToolFactory Initialized");
    }

    @Override
    public void preFacadeInit(ExecutionContextFactory ecf) {
    }

    /*
       paramters:
        String reactAppName
        String basePath
        Map<String, Map<String, Object>> appJsFileMap
            - ResourceReference resourceReference
            - boolean runOnce                       [optional, default false]
        Map<String, Object> optionMap               [optional]
            - int jsTimeout: ms
        Map<String, Object> poolConfig              [optional]
     */
    @Override
    @SuppressWarnings(value = "unchecked")
    public React getInstance(Object... parameters) {
        if (parameters.length < 1)
            throw new IllegalArgumentException("ReactSSRToolFactory getInstance must have at least one parameter of reactAppName");
        String reactAppName = (String) parameters[0];
        React react = reactMap.get(reactAppName);
        if (react == null) {
            if (parameters.length < 3)
                throw new IllegalArgumentException("ReactSSRToolFactory getInstance must have parameters of [reactAppName, basePath, appJsFileMap]");
            l.lock();
            try {
                react = reactMap.get(reactAppName);
                if (react == null) {
                    String basePath = (String) parameters[1];
                    Map<String, Map<String, Object>> appJsFileMap = (Map) parameters[2];
                    Map<String, Object> optionMap;
                    Map<String, Object> poolConfig;

                    if (parameters.length > 3) optionMap = (Map) parameters[3];
                    else optionMap = new HashMap<>();

                    if (parameters.length > 4) poolConfig = (Map) parameters[4];
                    else poolConfig = new HashedMap();

                    react = new React(ecf, basePath, appJsFileMap, optionMap, poolConfig);
                    reactMap.put(reactAppName, react);
                }
            } finally {
                l.unlock();
            }
        }
        return react;
    }

    @Override
    public void destroy() {

    }

    public ExecutionContextFactory getEcf() {
        return ecf;
    }
}
