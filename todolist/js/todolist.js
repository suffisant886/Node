$(function() {
    load();
    $('#title').on('keydown',function(event) {
        if(event.keyCode===13) {
            //先读取本地存储原来的数据
            var local=getdata();
            // console.log(local);
            local.push({title:$(this).val(),done:false})
            //将数组存储到本地存储
            savedata(local);
            load();//  这里我再次调用的时候load函数会重新将本地存储里面的数据再次重新追加，所有要先清空ol里面的li
        }
    }) 

    //a标签点击删除操作
    $("ol").on('click','a',function() {
        var data=getdata();
        var index=$(this).attr('id');
        data.splice(index,1);
        savedata(data);
        load();
    })

    //把待办事项和以及完成的事项关联起来
    $("ol,ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getdata();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        savedata(data);
        // 重新渲染页面
        load();
    });

    function getdata() {
        var data=localStorage.getItem('todolist');
        if(data!==null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    } 
    function savedata(data) {
        localStorage.setItem('todolist',JSON.stringify(data))
    }
    function load() {
        var data=getdata();
        console.log(data);
        $("ol,ul").empty();
        $.each(data,function(i,n) {
            if(n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>")
            }
            else {
                $("ol").prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>")
            }
        })
    }
}) 
