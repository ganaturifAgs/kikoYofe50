$(()=>{

    document.getElementById('year').textContent = new Date().getFullYear();
    let fecha =  new Date().toLocaleString()
    let datos = {invitado:$("#invitado").html(),fecha:fecha}
    localStorage.setItem("cliente",JSON.stringify(datos))


    let $popup = (msg)=>{ return  $("<div>").html(msg).addClass("popup")}
    let $btnOk = (texto)=>{  return $("<div>").html(texto).addClass("btnOk")}
    
    $(".btn-confirmar div").on("click",e=>{
        $.post('/confirmacion/nueva',datos).done(r=>{
            let $intro = $(".intro")
            $intro.css({"display":"block","opacity":1,"z-index":101})
            $intro.html($popup(r.msg).append($btnOk("Aceptar").on("click",(e)=>{$( $intro.css({"display":"none","opacity":0,"z-index":0}))})))
        })

    })

  
    $(".btn-entrar").on("click",event=>{
            $(".intro").animate({opacity:0,display:"none","z-index":0},500,'linear',elem=>{                   
                $("#ufemmia")[0].play()
            })
     })

$(".iconoUbi div").on("click",e=>{
                console.log($(e.currentTarget).attr("id"))
         let url = $(e.currentTarget).attr("id")==="icon2" ? "https://www.google.com/maps/dir//24.0251083,-104.6362673/@24.025023,-104.6361338,76m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D":"https://www.google.com/maps/dir//24.0360991,-104.6217199/@24.0361461,-104.6216626,117m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
        window.open(url,"_blank")
})
    
$(".wa").on("click",e=>{
    window.open("https://wa.me/524492764223?text=Hola,soy *<su-nombre>* me podria dar información sobre las invitaciones digitales","_blank")
})
    
$("#textoEditable").on("focus",e=>{
    if(e.currentTarget.innerHTML=== "Escriba aqui su mensaje")
        e.currentTarget.innerHTML=""
})

$("#textoEditable").on("keydown",e=>{
    let valor = e.currentTarget.innerText
    let cant = valor.length-1 === 0 ? 0:valor.length+1
    $("#quedan").html(200-cant)
    if(cant==200) 
        document.execCommand('delete',false,null)
})

$("#enviar").on("click",e=>{
        let datos = JSON.parse(localStorage.getItem("cliente"))
        let msg=$("#textoEditable").html()
        if(msg=="" || msg=="Escriba aqui su mensaje"){
            alert("No ha escrito ningun mensaje")
            return false
        }
        datos["mensaje"]= msg
        $.post("/mensajes/nuevo",datos).done(r=>{
            let $ventana = $popup(r.msg)
            $ventana.append($btnOk("regresar").on("click",e=>{ $ventana.css("display","none"); $("#textoEditable").html("")  }))
            $("body").append($ventana)
        })
})

$(".sonido").on("click",e=>{
    let $papi = $(e.currentTarget)
    let suena_o_no = $papi[0].children[0].id
    if(suena_o_no=="suena"){
        $papi.html('<i id="noSuena" class="fas fa-volume-xmark fa-2x"></i>')
        $("#ufemmia")[0].pause()
    }else{
        $papi.html('<i id="suena" class="fas fa-volume-high fa-2x"></i>')
        $("#ufemmia")[0].play()
    }
    
})


})