package com.scut.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

    @RequestMapping(value = "/page_admin_StudentModel.do")
    public String admin_StudentModel() {
        return "/WEB-INF/backup/admin_StudentModel.jsp";
    }

    @RequestMapping(value = "/page_admin_HouseparentModel.do")
    public String admin_HouseparentModel() {
        return "/WEB-INF/backup/admin_HouseparentModel.jsp";
    }

    @RequestMapping(value = "/page_admin_lkx.do")
    public String admin_lkx() {
        return "adminIndex";
    }

    @RequestMapping(value = "page_houseparent_dorm.do")
    public String page_houseparent_dorm() {
        return "houseparent_dorm";
    }

}
