// ==UserScript==
// @name         djp_post_ntpn_simda
// @namespace    https://rumahkonfirmasi.pajak.go.id/konfirmasi/ntpn
// @version      0.1
// @description  Djp_Post_NTPN_to_Simda
// @include      https://*
// @include      http://*
// @author       arsdev
// @match        https://rumahkonfirmasi.pajak.go.id/konfirmasi/ntpn
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest

// ==/UserScript==

(function() {
    'use strict';
 console.log('TamperMonkey proses.. ')
    let tahun="2021";
    var namaskpd="";
    let nmkeg="";
    let npwp="";
    let nmrek="";
    let nobukti="";
    let nilblj=""
    let nmpot="";
    let nilpjksimda=""
    let kodemapsimda="";
    //Start disni
    let FormNPWP = document.getElementsByClassName('form-group row')[0];
    let createNode = FormNPWP.parentNode.parentNode;
    var nodeNpwp = document.createElement("div");
    nodeNpwp.setAttribute ('class', 'form-group row');
    nodeNpwp.innerHTML=' <div class="col-md-1"></div>'+
        '<label class="col-md-3 col-form-label label-rumkon" style="text-align: right;" >Jenis Bukti Transaksi</label>'+
        '<div class="col-md-5" >'+
           '<div class="form-check">'+
             '<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked value="1">'+
             '<label class="form-check-label" for="flexRadioDefault1">'+
             ' GU-TU'+
             '</label>'+
           '</div>'+
           '<div class="form-check">'+
             '<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value ="2">'+
             '<label class="form-check-label" for="flexRadioDefault2">'+
             ' LS ByBendahara'+
             '</label>'+
           '</div>'+
           '<div class="form-check">'+
             '<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value ="3">'+
             '<label class="form-check-label" for="flexRadioDefault2">'+
             ' LS ByPhk3'+
             '</label>'+
           '</div>'+
        '</div>'+
        '<div class="col-md-1"></div>'+
        '<label class="col-md-4 col-form-label label-rumkon" style="text-align: right;" >Parameter Nomor Bukti Simda</label>'+
        '<div class="col-md-5" >'+
        '<input type="text" id="txtNobuktiSimda" name="txtnobuktisimda" class="form-control"'+
        'placeholder="Bukti (Bukti Kas atau Nomor SP2D">'+
        '</div>'+
        '<div class="col-md-1"></div>'+
        '<label class="col-md-4 col-form-label label-rumkon" style="text-align: right;" >Data NTPN Didapat </label>'+
        '<div class="col-md-5">'+
        '<label id="DataNTPN_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '<br/>'+
        '<label id="DataNPWP_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '<br/>'+
        '<label id="DataUraianPajak_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '<br/>'+
        '<label id="DataNilaiPajak_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '<br/>'+
        '<label id="DataTglPajak_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '<br/>'+
        '<label id="DataKodeMap_PostToSimda" class="label-danger text-danger" style="font-weight: bold; font-size:11pt"></label>'+
        '</div>'+
        '<div class="col-md-1"></div>'+
        '<label class="col-md-4 col-form-label label-rumkon" style="text-align: right;" >Data Detail Pajak Simda</label>'+
        '<div class="col-md-0">'+
        '<label id="prosesGetDataSimda" style="font-weight:bold;text-align: right;" ><label/>'+
        '</div>'+
        '<br/>'+
        '<div class="col-md-5">'+
        '<label id="DetailNmskpd"></label>'+
        '<br/>'+
        '<label id="DetailNmkeg"></label>'+
        '<br/>'+
        '<label id="DetailNmrek"></label>'+
        '<br/>'+
        '<label id="DetailNobukti"></label>'+
        '<br/>'+
        '<label id="DetailNilblj"></label>'+
        '<br/>'+
        '<label id="DetailNmpot"></label>'+
        '<br/>'+
        '<label id="DetailNilpjksimda"></label>'+
        '<br/>'+
        '<label id="DetailKodeMapsimda"></label>'+
        '</div>';
    createNode.appendChild(nodeNpwp);
    let createButton = document.getElementById('form_konfirmasintpn');
    //Leave quietly if we cannot find that button
    if(!createButton){
        return;
    };
    let createButtonParent = createButton.parentNode.parentNode;
    var node = document.createElement("div");
    node.setAttribute ('class', 'kt-portlet__body form');
    node.setAttribute ('id', 'btnPostToSimda');
    node.innerHTML='<div class="form-group row"><div class="col-md-4"></div>'+
                                    '<div class="col-md-8">'+
                                       ' <div class="form-group row">'+
                                        '<div class="col-6 col-md-4">'+
                                        '<button type="button" class="btn btn-info btn-elevate btn-pill w-100" id="btnPostNTPN_ToSimda" style="margin-top:-100px ">'+
                                        '<i class="flaticon-paper-plane-1" style="color: white ;   "></i>POST NTPN To Simda</button>'+
                                        '</div>'+
                                    '</div>'+
                               '</div>';
                               
    createButtonParent.appendChild(node);
    let btnPostNtpn = document.getElementById("btnPostNTPN_ToSimda");
    btnPostNtpn.addEventListener("click",PostNTPN_toSimda);
     function PostNTPN_toSimda(){
        let dtNtpnToPost=document.getElementById("ntpn").textContent;
        let dtTglbyrPajakToPost=document.getElementById("tglBayar").textContent;
        let dtKdmapToPost=document.getElementById("kodeJnsPjk").textContent;
        let dtNpwpToPost=document.getElementById("npwp3").textContent;
        let dtJnsbelanja= document.querySelector('input[name="flexRadioDefault"]:checked').value;
        console.log("http://localhost:2200/ntpn/postntpndjptosimda?ntpn="+dtNtpnToPost+"&tglbyrpajak="+dtTglbyrPajakToPost+"&kdmap="+dtKdmapToPost+
             "&npwp="+dtNpwpToPost+"&nobukti="+nobukti+"&tahun="+tahun+"&jnsbelanja="+dtJnsbelanja,);
          GM_xmlhttpRequest ({
            method:         "POST",
            url:            "http://localhost:2200/ntpn/postntpndjptosimda?ntpn="+dtNtpnToPost+"&tglbyrpajak="+dtTglbyrPajakToPost+"&kdmap="+dtKdmapToPost+
             "&npwp="+dtNpwpToPost+"&nobukti="+nobukti+"&tahun="+tahun+"&jnsbelanja="+dtJnsbelanja,
            responseType:   "json",
            onload:         response_PostNTPN,
            onabort:        reportAJAX_Error,
            onerror:        reportAJAX_Error,
            ontimeout:      reportAJAX_Error
        });
    }
    function response_PostNTPN(res){
       console.log(res.response);
       var dt=res.response;
       alert("Hasil : "+ JSON.stringify(dt.message));
    }
    //Try and build a ticket
    function recordTheThing(){
        alert("Berhasill")
        //Prep a call to Jira
        let xhr = new XMLHttpRequest(),
            url = '/rest/api/2/issue/';
        //Ask what the user did
        var thing = window.prompt("Describe the activity performed?","");
        //Get out if the user got cold feet
        if(!thing){
            return;
        }
        //Start prepping the http request
        xhr.open('POST', url, true);
        //Use JSON since we will not fill in a form
        xhr.setRequestHeader("Content-Type", "application/json");
        //Prep the navigation to the new issue
        xhr.onreadystatechange = function () {
            debugger;
            //readyState:3
            //response: {"id":"125529","key":"CF-10282","self":"https://jira.it.aenetworks.com/rest/api/2/issue/125529"}
            //HTTP/REST return code 201 means created
            if (xhr.readyState === 4 && xhr.status === 201) {
                var json = JSON.parse(xhr.responseText);
                window.location.href = 'https://jira.it.aenetworks.com/browse/' + json.key;
            }
        };
    };

    let listenTobtnOkNtpn= document.getElementById("btnOkNtpn");
    listenTobtnOkNtpn.addEventListener("click",btnoktpn);
    function btnoktpn(){
        let npwpGet=document.getElementById("npwp3").textContent;
        let namawp3Get=document.getElementById("namaWp3").textContent;
        let alamatwp3Get=document.getElementById("alamatWp3").textContent;
        let ntpnGet=document.getElementById("ntpn").textContent;
        let kodebillingGet=document.getElementById("kodeBilling").textContent;
        let kdmapGet=document.getElementById("kodeJnsPjk").textContent;
        let kdjnssetorGet=document.getElementById("kdJnsSetor").textContent;
        let jmlSetorGet=document.getElementById("jmlSetor").textContent;
        let masapajakGet=document.getElementById("masaPajak").textContent;
        let thnpajakGet=document.getElementById("thnPajak").textContent;
        let nopGet=document.getElementById("nop").textContent;
        let noketetapanGet=document.getElementById("noKetetapan").textContent;
        let uraianGet=document.getElementById("uraian").textContent;
        let namabankGet=document.getElementById("namaBank").textContent;
        let notransaksibankGet=document.getElementById("noTransaksiBank").textContent;
        let tglbayarGet=document.getElementById("tglBayar").textContent;
        let npwppenyetorGet=document.getElementById("npwpPenyetor").textContent;
        var dtNTPN_toPost =(`NTPN : ${ntpnGet}` );
        let nodeNTPNtoPostToSimda = document.getElementById('DataNTPN_PostToSimda');
        nodeNTPNtoPostToSimda.append(dtNTPN_toPost);
        document.getElementById('DataUraianPajak_PostToSimda').append(`Uraian : ${uraianGet}`);
        document.getElementById('DataNilaiPajak_PostToSimda').append(`Nilai : ${jmlSetorGet}`);
        document.getElementById('DataTglPajak_PostToSimda').append(`Tanggal : ${tglbayarGet}`);
        document.getElementById('DataKodeMap_PostToSimda').append(`Kode Map Djp : ${kdmapGet}`);
        document.getElementById('DataNPWP_PostToSimda').append(`NPWP : ${npwpGet}`);
        let nobukti = document.getElementById('txtNobuktiSimda').value;
        let jnsbelanja = document.querySelector('input[name="flexRadioDefault"]:checked').value;
        document.getElementById('prosesGetDataSimda').append(`${'Proses sinkronisasi data SIMDA ..'}`);;
        GM_xmlhttpRequest ({
            method:         "GET",
            url:            "http://localhost:2200/ntpn/getdetailpajaksimda?npwp="+npwpGet+"&kdmap="+kdmapGet+"&nobukti="+nobukti+"&tahun="+tahun+"&jnsbelanja="+jnsbelanja,
            responseType:   "json",
            onload:         response_detailPajakSimda,
            onabort:        reportAJAX_Error,
            onerror:        reportAJAX_Error,
            ontimeout:      reportAJAX_Error
        });
    }
    function response_detailPajakSimda(res){
        var dt=res.response.data;
        if(dt.length==0)
        {
             document.getElementById('prosesGetDataSimda').textContent="";
             alert("Data tidak ada, Silakan Periksa Parameter Nomor Bukti dan Kode Billing");
        }else if(dt.length>1){
             document.getElementById('prosesGetDataSimda').textContent="";
           alert("Data parameter Nomor Bukti harus lebih spesifik. Silakan perbaiki");
        }
        else{
             document.getElementById('prosesGetDataSimda').textContent="";
        };
        var dtResult=JSON.stringify(dt);
        console.log(res.response);
        namaskpd=dt[0].nmskpd;
        nmkeg=dt[0].nmkeg;
        nmrek=dt[0].nmrek;
        nobukti=dt[0].nobukti;
        nilblj= parseInt(dt[0].nilblj,10);
        nmpot=dt[0].nmpot;
        kodemapsimda=dt[0].kodemap;
        nilpjksimda=dt[0].nilpjksimda;
        var nmskpdsimda =(`Skpd : ${namaskpd}` );
        let nodeNmskpd = document.getElementById('DetailNmskpd');
        nodeNmskpd.append(nmskpdsimda);
        var nmkegskpd =(`Kegiatan : ${nmkeg}` );
        let nodeNmkegsimda = document.getElementById('DetailNmkeg');
        nodeNmkegsimda.append(nmkegskpd);
        var nmreksimda =(`Rekening : ${nmrek}` );
        let nodeNmreksimda = document.getElementById('DetailNmrek');
        nodeNmreksimda.append(nmreksimda);
        var nobuktismda =(`No.Bukti : ${nobukti}` );
        let nodeNobukti = document.getElementById('DetailNobukti');
        nodeNobukti.append(nobuktismda);
        var nilbljsimda =(`Nilai Belanja : ${nilblj}` );
        let nodeNilblj = document.getElementById('DetailNilblj');
        nodeNilblj.append(nilbljsimda);
        var nmpotsimda =(`Nama Potongan : ${nmpot}` );
        let nodeNopotsimda = document.getElementById('DetailNmpot');
        nodeNopotsimda.append(nmpotsimda);
        var nilpjksimda =(`Nilai Pajak : ${nilpjksimda}` );
        let nodeNilpjksimd = document.getElementById('DetailNilpjksimda');
        nodeNilpjksimd.append(nilpjksimda);
        document.getElementById('DetailKodeMapsimda').append(`Kode Map Simda : ${kodemapsimda}`);

    }
    let btnCariPageDjp = document.getElementById("btnSubmitKonfNtpn");
    btnCariPageDjp.addEventListener("click",GetProfilNPWP_SKPD_Simda);
    function GetProfilNPWP_SKPD_Simda(){
        document.getElementById('DataNTPN_PostToSimda').textContent="";
        document.getElementById('DataUraianPajak_PostToSimda').textContent="";
        document.getElementById('DataNilaiPajak_PostToSimda').textContent="";
        document.getElementById('DataTglPajak_PostToSimda').textContent="";
        document.getElementById('DataKodeMap_PostToSimda').textContent="";
        document.getElementById('DetailNmskpd').textContent=" ";
        document.getElementById('DetailNmkeg').textContent="";
        document.getElementById('DetailNmrek').textContent="";
        document.getElementById('DetailNobukti').textContent="";
        document.getElementById('DetailNilblj').textContent="";
        document.getElementById('DetailNmpot').textContent="";
        document.getElementById('DetailNilpjksimda').textContent="";
        document.getElementById('DetailKodeMapsimda').textContent="";
        let ntpnValue = document.getElementById('txtkeyword').value;
        GM_xmlhttpRequest ({
            method:         "GET",
            url:            "http://localhost:2200/users/datass/"+ntpnValue,
            responseType:   "json",
            onload:         processJSON_Response,
            onabort:        reportAJAX_Error,
            onerror:        reportAJAX_Error,
            ontimeout:      reportAJAX_Error
        });
    }

    function reportAJAX_Error (rspObj) {
    console.error (`TM scrpt => Error ${rspObj.status}!  ${rspObj.statusText}`);
    };
    function processJSON_Response(rspObj) {
        console.log(rspObj.response);
        var dt=rspObj.response;
       //alert(JSON.stringify(dt.message));
    if (rspObj.status!=200 && rspObj.status != 304) {
        reportAJAX_Error (rspObj);
        return;
    }
    //-- The payload from the API will be in rspObj.response.
    var pyLd = rspObj.response;
    /*-- The rest is defined by the structure specified/returned by the API.
        See its docs for more.
    */
    //-- Add the info to a div and insert that div somewhere...
    var nearbyCity = pyLd.message;
    var usaState = pyLd.message;
    var forecastURL = pyLd.message;

    //-- Add the info to a div and insert that div somewhere...
   /* var resultsDiv =(`
        <h1 id="tmJsonMashupResults">
            For ${nearbyCity}, ${usaState}; you can see the forecast (JSON) at
           <!-- <a href="${forecastURL}">this link</a>.-->
        </h1>
    ` );
   var targetNd = ("#left-sidebar > div > nav[role='navigation']");
   if(targetNd.length)FormNPWP.append (resultsDiv);
   else console.error ("TM scrpt => Target node not found.");
   */
    }
})();