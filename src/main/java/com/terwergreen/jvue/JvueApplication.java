package com.terwergreen.jvue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//@ComponentScan(value = {"com.terwergreen.jvue"}) //包扫描路径
@EnableTransactionManagement //事务管理，等同于xml配置方式的
@SpringBootApplication
public class JvueApplication {

    public static void main(String[] args) {
        SpringApplication.run(JvueApplication.class, args);
    }

}

