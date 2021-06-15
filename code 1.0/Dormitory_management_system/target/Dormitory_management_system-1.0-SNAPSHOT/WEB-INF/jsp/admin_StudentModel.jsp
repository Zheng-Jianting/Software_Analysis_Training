<%--
  Created by IntelliJ IDEA.
  User: zjt
  Date: 2021/6/14
  Time: 12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Title</title>
  <!-- 查看学生信息 -->
  <script src="../../js/jquery-3.6.0.js"></script>
  <script type="text/javascript">
    $(function () {
      // 当前页面dom对象加载后, 执行loadStudentData()
      loadStudentData();

      $("#btnLoader").click(function () {
        loadStudentData();
      })
    })

    function loadStudentData() {
      $.ajax({
        url: "admin/displayStudent.do",
        type: "get",
        dataType: "json",
        success: function (data) {
          // 清除旧的数据
          $("#info").html("");
          // 添加新的数据
          $.each(data, function (i, n) {
            $("#info").append("<tr>")
                .append("<td>" + n.id + "</td>")
                .append("<td>" + n.password + "</td>")
                .append("</tr>")
          })
        }
      })
    }
  </script>

  <!-- 添加一个学生 -->
  <script src="../../js/jquery-ui.js"></script>
  <link rel="stylesheet" href="../../js/jquery-ui.css">
  <script type="text/javascript">
    $(function (){
      $("#dialog").dialog({
        autoOpen: false,
        show: "blind",
        hide: "explode",
        modal: true,
        buttons: [
          {
            text: "确定",
            click: function (){
              $.ajax({
                url: "admin/addStudentSeparately.do",
                data: {
                  id: $("input[id=add_id]").val(),
                  password: $("input[id=add_password]").val()
                },
                type: "post",
                dataType: "json",
                success: function (resp) {

                }
              })

              loadStudentData();
              $(this).dialog("close");
            }
          },{
            text: "取消",
            click: function(){
              $(this).dialog("close");
            }
          }
        ],
        closeOnEscape: false,
        title: "添加一个学生",
        position: "center",
        width: 400,
        height: 330,
        resizable: false,
      });

      $("#dialog_link").click(function (){
        $("#dialog").dialog("open");
      });
    });
  </script>

  <!-- 删除一个学生 -->
  <script type="text/javascript">
    $(function (){
      $("#dialog_del").dialog({
        autoOpen: false,
        show: "blind",
        hide: "explode",
        modal: true,
        buttons: [
          {
            text: "确定",
            click: function (){
              $.ajax({
                url: "admin/delStudentSeparately.do",
                data: {
                  id: $("input[id=del_id]").val(),
                },
                type: "post",
                dataType: "json",
                success: function (resp) {

                }
              })

              loadStudentData();
              $(this).dialog("close");
            }
          },{
            text: "取消",
            click: function(){
              $(this).dialog("close");
            }
          }
        ],
        closeOnEscape: false,
        title: "删除一个学生",
        position: "center",
        width: 400,
        height: 330,
        resizable: false,
      });

      $("#dialog_delBtn").click(function (){
        $("#dialog_del").dialog("open");
      });
    });
  </script>
</head>

<body>
  <div align="center">
    <!-- 查看学生信息 -->
    <table>
      <thead>
      <tr>
        <td>学号</td>
        <td>密码</td>
      </tr>
      </thead>
      <tbody id="info">

      </tbody>
    </table>
    <input type="button" id="btnLoader" value="查询所有学生">

    <!-- 添加一个学生 -->
    <br> <br>
    <button id="dialog_link">添加一个学生</button>
    <div id="dialog" align="center">
      <br>
      学号: <input type="text" id="add_id" name="id"> <br> <br>
      密码: <input type="text" id="add_password" name="password"> <br> <br>
    </div>

    <!-- 删除一个学生 -->
    <br> <br>
    <button id="dialog_delBtn">删除一个学生</button>
    <div id="dialog_del" align="center">
      <br>
      学号: <input type="text" id="del_id" name="id"> <br> <br>
    </div>

    <!-- 修改某一个学生信息 -->
    <!-- 导入一批学生 -->

  </div>
</body>
</html>
