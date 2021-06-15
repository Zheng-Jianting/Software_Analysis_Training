package com.scut.controller;

import com.scut.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

@Controller
public class LoginController {

    @Resource
    private LoginService service;

    @RequestMapping(value = "/login.do")
    public ModelAndView login(String id, String password, String identity) {
        ModelAndView mv = new ModelAndView();
        if(identity.equals("student")) {
            int res = service.isMatching(id, password, 0);
            if(res == 1) {
                mv.setViewName("studentIndex");
            }
            else {
                mv.setViewName("studentLoginFail");
            }
        }
        else if(identity.equals("houseparent")) {
            int res = service.isMatching(id, password, 1);
            if(res == 1) {
                mv.setViewName("houseparentIndex");
            }
            else {
                mv.setViewName("houseparentLoginFail");
            }
        }
        if(identity.equals("administrator")) {
            int res = service.isMatching(id, password, 2);
            if(res == 1) {
                mv.setViewName("adminIndex");
            }
            else {
                mv.setViewName("adminLoginFail");
            }
        }
        return mv;
    }

}
