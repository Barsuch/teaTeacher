$(document).ready(function () {
    //globals
    let bookList = ['A-Little-Life','Cold-Lake','the-maze-runner','themetamorfosis'];
    let root = "../teateacher/";

    //functions
    function findTAG(param,str) {//returns the contents of an element (param) in passed string (str)
        //data = "hello sir<header>hello there</header>";
            let tag1 = "<"+param+">";
            let tag2 = "</"+param+">";
            let position = str.search(tag1) + tag1.length;
            let tagdata = str.slice(position,str.search(tag2));
        return tagdata;
    }

    //class

    //main

    //schools list
    const schools = ["Nairobi School-(2005-2007) & (2008-2013)","St. John's Girls' High School-Sirende",
        "Kericho High School","Loreto Matunda Secondary School",
        "Nakuru Boys' High School","Nairobi Technical Training Institute",
        "Nakuru Girls' High School","St. Mary's School-Yala",
        "Njoro Boys' High School","St. Mark's Girls' High School-Cheragani",
        "Hospital Hill High School (Nairobi)","Ngara Girls' High School",
        "Migori Teachers' College","St. Peter's Marakwet Boys' High School",
        "Statehouse Girls' High School-(2009-2012) & (2016-2021)","Kakamega High School",
        "St. Ann's Sega Girls' Secondary School","Elderma Ravine Girls' Secondary School",
        "Sacho High School","Segero Adventist Group of Schools",
        "Moi High School-Kabarak-(2009-2014) & (2015-2020)","Parklands Baptist Academy-Nairobi",
        "St. Mark's Boys' High School-Cheragani","Mary Hill Girls' High School",
        "Ofafa Jericho High School (Nairobi)","Kisima Girls' High School",
        "Paul Boit High School-Kapkong","St. Mary's Kibabii Boys' High School",
        "Nasokol Girls' Secondary School","Kapropita Girls' High School",
        "Kapsabet High School","St. Paul's Amukura High School","Maseno School",
        "Taita Toweet Secondary School","Onjiko High School",
        "Cheptenye High School","Poror High School","Terige High School","St. Patrick's High School-Iten"];

        let i=0,loop=1;
        const div = $("#schl-list").html();//copy
        $("#schl-list").html("");//clear
        let content = "";
    schools.forEach(element => {
        content+="<li>"+element+"</li>";
        i++;
        if (i===20&&loop===1) {
            let copy_div = jQuery(div);
            copy_div.find("ol").append(content);//update buffer
            content="";//clear
            $("#schl-list").append(copy_div);//update DOM
            i=0; loop++;
        }
    });
            let copy_div = jQuery(div);
            copy_div.find("ol").append(content);//update buffer
            content="";//clear
            $("#schl-list").append(copy_div);//update DOM

    //update DOM with section.html
    $.ajax({
        type: "get",
        url: root+"sections.html",
        data: "",
        dataType: "",
        success: function (response) {
            $("#heading").html(findTAG("heading",response));
            $("#header").html(findTAG("header",response));
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("updating header failed "+textStatus+" error: "+errorThrown);
        }
    });

    //flags
    {
        const flag_html = $(".flags").html();
        $(".flags").html("");//clear
        let country = ["KENYA","UGANDA","TANZANIA","RWANDA","BURUNDI","D.R CONGO","S-SUDAN"];
        let country_image = ["Flag-Kenya.webp","Flag-Uganda.webp","Flag-Tanzania.webp",
            "Flag-Rwanda.webp","Flag-Burundi.webp","Flag-Democratic-Republic-of-the-Congo.webp",
            "Bandera-de-Sudan-del-Sur.webp"];
        let no = 0;//index for country_image array
        country.forEach(nchi => {
            let markup = jQuery(flag_html);
            markup.find("img").attr("src",root+"pics/flags/"+country_image[no]); no++;
            markup.find("p").text(nchi);
            $(".flags").append(markup);
        }); 
    }

    //books store
    {
        const book_html = $("#cat_section").html();
        $("#cat_section").html("");//clear
        const categories = ["Profiles of Members of the School Senior Leadership & Management Team (Principal's Team)",
            "Duties & Responsibilities of Members of the School Senior Leadership & Management Team (Principal's Team)",
            "Duties & Responsibilities of other Teachers in School",
            "School Teamwork & Professional collaboration",
            "Curriculum Management Resources",
            "Student Resources",
            "Poetry Manuals"];
        let i=1;
        categories.forEach(categ => {
            let markup = jQuery(book_html);
            //console.log("class btn : "+JSON.stringify(class_attr));
            markup.find("button").attr("id",i);//append class attrib    
            markup.find("button").text(categ);//update markup
            markup.find("button").parent().attr("id","cat"+i++);//append class attrib
            //update DOM
            $("#cat_section").append(markup);
        });
        //console.log($("#cat_section").html());

        //add books into categories
        $(".dropdown-books").hide();//hide dropdown-books
        const books_dis = "<div class=\"col-12 col-sm-6 col-md-4 col-lg-3 book-img\"><img class=\"img-fluid\" src=\"\" alt=\"try\"></div>";
        $(document).on("click","#cat_section button",function()
        { 
            let cat_no = parseInt($(this).attr("id"));//convert string to integer
            let category = "#cat"+cat_no+" .dropdown-books";
            if ($(category).css("display") === 'none') {//check if it is already visible
                $(".dropdown-books").html("");//flush
                $(".dropdown-books").hide();//hide
                let char = ['a','b','c','d','e','f'];
                char.forEach(element => {
                    let path_name = root+"Books_prices/"+cat_no+element+".png";
                    //test availabilty
                    $.ajax({
                        type: "get",
                        url: path_name,
                        data: "",
                        dataType: "",
                        async: false,
                        timeout: 5000,//5 secs
                        success: function (data) {
                            let markup = jQuery(books_dis);
                            let id = "img"+cat_no+element;
                            markup.find("img").attr("src",path_name);
                            markup.find("img").parent().attr("id",id);
                            $(category).append(markup);
                            $(category).show();
                        }
                    });
                });
            }
            else{//if visible collapse
                $(".dropdown-books").hide();//hide
            }
        });
        //change cursor on book image hover
        
        $(document).on("click",".book-img",function()
        {
            let imgId = $(this).attr("id");
            let idInt = imgId.substring(3,imgId.length);
            console.log("img id :"+idInt);            
        });
    }
});