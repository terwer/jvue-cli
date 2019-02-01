package com.terwergreen.jvuecli.controller;

import com.terwergreen.jvuecli.vue.VueRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

/**
 * 关于
 *
 * @author Terwer
 * @version 1.0
 * 2019/2/1 11:45
 **/
@Controller
public class AboutController {
    @Autowired
    private VueRenderer vueRenderer;

    @RequestMapping("/about")
    public String about(Model model) {
        // 设置路由上下文
        Map<String, Object> context = new HashMap<>();
        context.put("url", "/about");

        String app = vueRenderer.renderContent(context);
        model.addAttribute("content", app);
        model.addAttribute("rnd", System.currentTimeMillis());
        return "index";
    }
}
