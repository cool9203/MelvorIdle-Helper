// ==UserScript==
// @name         melvor idle helper
// @namespace    https://melvoridle.com/
// @version      0.0.test (for melvor version:Alpha v0.17)
// @description  try to take over the world!
// @author       cool9203
// @match        https://melvoridle.com/index.php
// @include      https://melvoridle.com/*
// @grant        none
// ==/UserScript==
let MELVOR_VERSION = "Alpha v0.17";

let eat_food_size = 0.5;
let auto_loot = false;
let auto_sell_junk = false;
let auto_eat_food = false;
let auto_light_bonfire = false;
let auto_re_plant = false;

let sell_item_id = [];
let junk_id = [648, 649, 650, 651, 652, 653, 654, 655];

//let sell_item_id = [128, 129, 130, 131, 132, 669, 667, 670, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

function loot(){
    console.log("start loot");
    lootAll();
}


function sell_junk(){
    console.log("start sell_junk");
    for (let i = 0; i < junk_id.length; i++){
        let result = getBankId(junk_id[i]);
        if (result != false){
            sell_item(junk_id[i]);
        }
    }

    for (let i = 0; i < sell_item_id.length; i++){
        let result = getBankId(sell_item_id[i]);
        if (result != false){
            sell_item(sell_item_id[i]);
        }
    }
}


function sell_item(index){
    console.log(`sell item: category=${items[index].category}, type=${items[index].type}, name=${items[index].name}`);
    sellItem(index);
    document.querySelector(".swal2-confirm").click()
}


async function eat_food(){
    console.log("start eat_food");
    let max_hp = skillLevel[9] * 10;
    let now_hp = combatData["player"].hitpoints;
    let enemy_attack = parseInt( document.querySelector("#combat-enemy-strength-bonus").innerHTML.replace("(", "").replace(")", "") );

    if ((now_hp <= max_hp * eat_food_size) || (now_hp <= enemy_attack)){
        while (true){
            let my_progress = parseInt( document.querySelector("#combat-progress-attack-player").style.width.replace("%", "") );
            let enemy_progress = parseInt( document.querySelector("#combat-progress-attack-enemy").style.width.replace("%", "") );
            if (enemy_progress >= my_progress || my_progress <= 10 || (now_hp <= enemy_attack)){
                break;
            }else{
                await delay(50);
            }
        }
        while (now_hp < max_hp * 0.98){
            eatFood();
            now_hp = combatData["player"].hitpoints;
        }
    }
}


function light_bonfire(){
    console.log("start light_bonfire");
    lightBonfire();
}


function add_gloop_or_compost(i, j){
    console.log("start add_gloop");
    if (i === undefined || j === undefined){
        for (let i = 0; i < newFarmingAreas.length; i++){
            for (let j = 0; j < newFarmingAreas[i].patches.length; j++){
                gloop_or_compost(i ,j);
            }
        }
    }else{
        gloop_or_compost(i ,j);
    }
}


function gloop_or_compost(i, j){
    if(checkBankForItem(CONSTANTS.item.Weird_Gloop)) {
        addGloop(i,j);
    } else {
        if(checkBankForItem(CONSTANTS.item.Compost)) {
            if(bank[getBankId(CONSTANTS.item.Compost)].qty < 5) {
                buyQty = 5 - bank[getBankId(CONSTANTS.item.Compost)].qty
                buyCompost(true)
            }
        } else {
            buyQty = 5
            buyCompost(true)
        }
        addCompost(i,j,5)
    }
}


function re_plant(){
    for (let i = 0; i < newFarmingAreas.length; i++){
        for (let j = 0; j < newFarmingAreas[i].patches.length; j++){
            let farm_patches = newFarmingAreas[i].patches[j];
            let last_seed = farm_patches.seedID;
            let grown_id = items[last_seed].grownItemID;
            if (farm_patches.hasGrown){  //if now is grown
                if(checkBankForItem(grown_id) || (bankMax + baseBankMax) > bank.length){  //check last_seed grown item in bank or bank is full
                    harvestSeed(i,j);
                    if (checkBankForItem(last_seed)){
                        add_gloop_or_compost(i, j);
                    }
                }
                selectedPatch = [i,j];
                selectedSeed = last_seed;
                plantSeed();
            }
        }
    }
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
    console.log("melvor idle helper version:", MELVOR_VERSION)

    //create helper button after setting_button and listen helper button.
    //listen action:show or hidden ".helper_option"
    let setting_button = document.querySelectorAll(".nav-main-item")[35];
    let helper_setting = create_helper_setting_button();
    setting_button.insertAdjacentElement("afterend", helper_setting);
    helper_setting.addEventListener("click", function(){
        helper_option_display();
    });

    //create option and bind option listen function
    let next_obj = create_helper_option(helper_setting, "", sell_junk, "button", "sell junk");
    next_obj = create_helper_option(next_obj, "", add_gloop_or_compost, "button", "add all gloop");
    next_obj = create_helper_option(next_obj, "auto loot", change_auto_loot, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto sell junk", change_auto_sell_junk, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto eat food", change_auto_eat_food, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto light bonfire", change_auto_light_bonfire, "checkbox", "");
    next_obj = create_helper_option(next_obj, "auto replant", change_auto_re_plant, "checkbox", "");
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
        auto_eat_food = setInterval(eat_food, 1500);
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

function change_auto_re_plant(){
    if (auto_re_plant == false){
        re_plant();
        auto_re_plant = setInterval(re_plant, 301000);
    }else{
        clearInterval(auto_re_plant);
        auto_re_plant = false;
    }
}
