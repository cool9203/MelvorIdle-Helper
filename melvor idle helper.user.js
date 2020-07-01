// ==UserScript==
// @name         melvor idle helper
// @namespace    https://melvoridle.com/
// @version      0.0.test (for melvor version:0.15.4)
// @description  try to take over the world!
// @author       cool9203
// @match        https://melvoridle.com/index.php
// @include      https://melvoridle.com/*
// @grant        none
// ==/UserScript==

let eat_food_size = 0.5;
let auto_loot = false;
let auto_sell_junk = false;
let auto_eat_food = false;
let auto_light_bonfire = false;
let auto_re_plant = false;

let sell_item_id = [648, 649, 650, 651, 652, 653, 654, 655]

let seed_id = {0:[143, 144, 145, 146, 147, 148, 149, 150],
               1:[527, 528, 529, 530, 531, 532, 533, 534],
               2:[160, 161, 162, 163, 164]};

function loot(){
    console.log("start loot");
    lootAll();
}


function sell_junk(){
    console.log("start sell_junk");
    for (let i = bank.length - 1; i >= 0; i--){
        if (bank[i].type == "Junk"){
            console.log(`${i}:${bank[i].name}`);
            sellItem(i);
            document.querySelector(".swal2-confirm").click()
        }
    }
}


function eat_food(){
    console.log("start eat_food");
    let max_hp = skillLevel[9] * 10;
    let now_hp = combatData["player"].hitpoints;
    if (now_hp <= max_hp * eat_food_size){
        eatFood();
    }
}


function light_bonfire(){
    console.log("start light_bonfire");
    lightBonfire();
}


function add_gloop(){
    console.log("start add_gloop");
    for (let i = 0; i < newFarmingAreas.length; i++){
        for (let j = 0; j < newFarmingAreas[i].patches.length; j++){
            //console.log(i,j);
            addGloop(i ,j);
        }
    }
}


function re_plant(){
    ;
}


function create_helper_setting_button(){
    let main_item = document.createElement("li");
    let a = document.createElement("a");
    let span = document.createElement("span");

    main_item.classList.add("nav-main-item");
    main_item.id = "helper_setting";

    a.classList.add("nav-main-link");
    a.classList.add("nav-compact");

    span.classList.add("nav-main-link-name");
    span.innerText = "helper setting";

    main_item.insertAdjacentElement("beforeend", a);
    a.insertAdjacentElement("beforeend", span);

    return main_item;
}


function create_helper_option(insert_obj, name, change_function, type, value){
    let option = document.createElement("input");
    option.classList.add("helper_option");
    option.type = type;
    option.value = value;
    option.style.display = "none";
    option.addEventListener("click", function(){
        change_function();
    });

    let label = document.createElement("label");
    label.classList.add("helper_option");
    label.innerText = name;
    label.style.display = "none";

    let next_line = document.createElement("br");
    next_line.classList.add("helper_option");
    next_line.style.display = "none";

    insert_obj.insertAdjacentElement("afterend", option);
    option.insertAdjacentElement("afterend", label);
    label.insertAdjacentElement("afterend", next_line);

    return next_line;
}


function helper_option_display(){
    let option_list = document.querySelectorAll(".helper_option");

    for (let i = 0; i < option_list.length; i++){
        if (option_list[i].style.display.length == 0){
            option_list[i].style.display = "none";
        }else{
            option_list[i].style.display = "";
        }
    }
}


(async function() {
    console.log("tampermonkey start");

    //create helper button after setting_button and listen helper button.
    //listen action:show or hidden ".helper_option"
    let setting_button = document.querySelectorAll(".nav-main-item")[32];
    let helper_setting = create_helper_setting_button();
    setting_button.insertAdjacentElement("afterend", helper_setting);
    helper_setting.addEventListener("click", function(){
        helper_option_display();
    });

    //create option and bind option listen function
    let next_obj = create_helper_option(helper_setting, "", sell_junk, "button", "sell junk");
    next_obj = create_helper_option(next_obj, "", add_gloop, "button", "add all gloop");
    next_obj = create_helper_option(next_obj, "auto loot", change_auto_loot, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto sell junk", change_auto_sell_junk, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto eat food", change_auto_eat_food, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto light bonfire", change_auto_light_bonfire, "checkbox", "");
})();

function delay(ms){
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove("success");
        }, ms);
    });
}


//listen function
function change_auto_loot(){
    if (auto_loot == false){
        loot();
        auto_loot = setInterval(loot, 10000);
    }else{
        clearInterval(auto_loot);
        auto_loot = false;
    }
}

function change_auto_sell_junk(){
    if (auto_sell_junk == false){
        sell_junk();
        auto_sell_junk = setInterval(sell_junk, 10000);
    }else{
        clearInterval(auto_sell_junk);
        auto_sell_junk = false;
    }
}

function change_auto_eat_food(){
    if (auto_eat_food == false){
        eat_food();
        auto_eat_food = setInterval(eat_food, 1000);
    }else{
        clearInterval(auto_eat_food);
        auto_eat_food = false;
    }
}

function change_auto_light_bonfire(){
    if (auto_light_bonfire == false){
        light_bonfire();
        auto_light_bonfire = setInterval(light_bonfire, 20500);
    }else{
        clearInterval(auto_light_bonfire);
        auto_light_bonfire = false;
    }
}
