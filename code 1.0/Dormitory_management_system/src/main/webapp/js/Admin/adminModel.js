//设置表格是可编辑的
function SetTableCanEdit(table){
  for(var i=1; i<table.rows.length;i++){
    SetRowCanEdit(table.rows[i]);
  }
}

//设置行是可编辑的
function SetRowCanEdit(row){
  for(var j=0;j<row.cells.length; j++){
    //如果当前单元格指定了编辑类型，则表示允许编辑
    var editType = row.cells[j].getAttribute("EditType");
    if(!editType){
      //如果当前单元格没有指定，则查看当前列是否指定
      editType = row.parentNode.rows[0].cells[j].getAttribute("EditType");
    }
    if(editType){
      row.cells[j].onclick = function (){
        EditCell(this);
      }
    }
  }

}

//设置指定单元格可编辑
function EditCell(element, editType){
  var editType = element.getAttribute("EditType");
  if(!editType){
    //如果当前单元格没有指定，则查看当前列是否指定
    editType = element.parentNode.parentNode.rows[0].cells[element.cellIndex].getAttribute("EditType");
  }

  switch(editType){
    case "TextBox":
      CreateTextBox(element, element.innerHTML);
      break;
    case "DropDownList":
      CreateDropDownList(element);
      break;
    default:
      break;
  }
}

//为单元格创建可编辑输入框
function CreateTextBox(element, value){
  //检查编辑状态，如果已经是编辑状态，跳过
  var editState = element.getAttribute("EditState");
  if(editState != "true"){
    //创建文本框
    var textBox = document.createElement("INPUT");
    textBox.type = "text";
    textBox.className="EditCell_TextBox";
    //设置文本框当前值
    if(!value){
      value = element.getAttribute("Value");
    }
    textBox.value = value;

    //设置文本框的失去焦点事件
    textBox.onblur = function (){
      CancelEditCell(this.parentNode, this.value);
    }
    //向当前单元格添加文本框
    ClearChild(element);
    element.appendChild(textBox);
    textBox.focus();
    textBox.select();

    //改变状态变量
    element.setAttribute("EditState", "true");
    element.parentNode.parentNode.setAttribute("CurrentRow", element.parentNode.rowIndex);
  }

}


//为单元格创建选择框
function CreateDropDownList(element, value){
  //检查编辑状态，如果已经是编辑状态，跳过
  var editState = element.getAttribute("EditState");
  if(editState != "true"){
    //创建下接框
    var downList = document.createElement("Select");
    downList.className="EditCell_DropDownList";

    //添加列表项
    var items = element.getAttribute("DataItems");
    if(!items){
      items = element.parentNode.parentNode.rows[0].cells[element.cellIndex].getAttribute("DataItems");
    }

    if(items){
      items = eval("[" + items + "]");
      for(var i=0; i<items.length; i++){
        var oOption = document.createElement("OPTION");
        oOption.text = items[i].text;
        oOption.value = items[i].value;
        downList.options.add(oOption);
      }
    }

    //设置列表当前值
    if(!value){
      value = element.getAttribute("Value");
    }
    downList.value = value;

    //设置创建下接框的失去焦点事件
    downList.onblur = function (){
      CancelEditCell(this.parentNode, this.value, this.options[this.selectedIndex].text);
    }

    //向当前单元格添加创建下接框
    ClearChild(element);
    element.appendChild(downList);
    downList.focus();

    //记录状态的改变
    element.setAttribute("EditState", "true");
    element.parentNode.parentNode.setAttribute("LastEditRow", element.parentNode.rowIndex);
  }

}


//取消单元格编辑状态
function CancelEditCell(element, value, text){
  element.setAttribute("Value", value);
  if(text){
    element.innerHTML = text;
  }else{
    element.innerHTML = value;
  }
  element.setAttribute("EditState", "false");

  //检查是否有公式计算
  //CheckExpression(element.parentNode);
}

//清空指定对象的所有字节点
function ClearChild(element){
  element.innerHTML = "";
}

//添加行
function AddRow(table, index){
  var lastRow = table.rows[table.rows.length-1];
  var newRow = lastRow.cloneNode(true);
  table.tBodies[0].appendChild(newRow);
  SetRowCanEdit(newRow);
  return newRow;
}


//删除行
function DeleteRow(table, index){
  for(var i=table.rows.length - 1; i>0;i--){
    var chkOrder = table.rows[i].cells[0].firstChild;
    if(chkOrder){
      if(chkOrder.type = "CHECKBOX"){
        if(chkOrder.checked){
          //执行删除
          table.deleteRow(i);
        }
      }
    }
  }
}