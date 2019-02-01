package com.terwergreen.jvuecli.vue;

import java.util.Map;

/**
 * 服务端渲染Vue
 */
public interface VueRenderer {
    /**
     * 根据上下文渲染实例
     * @param context 上下文
     * @return 服务端html
     */
    String renderContent(Map<String, Object> context);
}