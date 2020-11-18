# for melvor version : Alpha v0.17 

[中文版本的README](https://github.com/cool9203/MelvorIdle-Helper/blob/master/README:zh-TW.md)  

# feature introduction and to do list
- [x] auto loot
- [x] auto eat food :  
eat food condition : now_hp < (max_hp * 0.5)  or  now_hp <= enemy attack  
now can clever to auto eat food. as follows:  
eat food right away when (your attack progress <= enemy progress) or (your attack pregress <= 10%) or (now_hp <= enemy attack)  
- [x] auto light bonfire
- [x] auto sell junk :  
sell all junk, you can set sell item. watch [this](#how-to-set-auto-sell-or-quick-sell-item)  
- [x] quick sell junk : same as "auto sell junk"
- [x] quick add gloop : auto fertilize, if your not have weird gloop, well buy 5 cpmpost and use
- [x] auto replant : auto plant last seed, auto fertilize and auto harvest

# how to install  
### step 1. 
install [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  

### step 2.
click [melvor idle helper.user.js](https://github.com/cool9203/MelvorIdle-Helper/blob/master/melvor%20idle%20helper.user.js)  
![](https://i.imgur.com/JUx8S7T.png)  


# how to use helper setting  
![](https://i.imgur.com/wJdBScd.png)  
click helper setting to show setting option, or hidden setting option.


# how to set auto sell or quick sell item  
![](https://i.imgur.com/N37Vgyz.png)  
edit line 20 or line 21 number to change sell item.  
item id in [melvor wiki](https://wiki.melvoridle.com/index.php?title=Table_of_Items)  

---

# this code is open source, welcome used this code.
