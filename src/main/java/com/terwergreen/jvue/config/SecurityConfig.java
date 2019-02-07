package com.terwergreen.jvue.config;

import com.terwergreen.jvue.core.CommonService;
import com.terwergreen.jvue.pojo.SiteConfig;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;

import static com.terwergreen.jvue.util.Constants.AUTH_ERROR_URL;
import static com.terwergreen.jvue.util.Constants.AUTH_LOGIN_PAGE;

/**
 * @Author Terwer
 * @Date 2018/6/22 15:55
 * @Version 1.0
 * @Description 安全配置
 **/
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private Log logger = LogFactory.getLog(this.getClass());

//    @Resource
//    private SysUserService sysUserService;

    @Resource
    private CommonService commonService;

//    /**
//     * 注册UserDetailsService的bean
//     *
//     * @return
//     */
//    @Bean
//    UserDetailsService customUserService() {
//        return sysUserService;
//    }

    /**
     * 获取密码加密策略
     *
     * @return 密码加密策略
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //运行加载iframe
        http.headers().frameOptions().disable();

        //关闭csrf
        http.csrf().disable();

        //获取站点配置
        SiteConfig siteConfigDTO = commonService.getSiteConfig();

        //配置权限及登录验证
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/" + siteConfigDTO.getAdminpath() + "/**").hasRole("ADMIN")
                .and()
                .formLogin()
                .loginPage(AUTH_LOGIN_PAGE).failureUrl(AUTH_ERROR_URL)
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        //内存中缓存权限数据
        auth.inMemoryAuthentication().withUser("admin").password(passwordEncoder().encode("123456")).roles("ADMIN");
        String encodePassword = passwordEncoder().encode("123456");
        logger.info("source:123456,encodePassword:" + encodePassword);
        // auth.userDetailsService(customUserService()).passwordEncoder(BugucmsConfig.passwordEncoder());
    }
}


