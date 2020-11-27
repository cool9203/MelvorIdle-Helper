# 對應melvor版本 : Alpha v0.17  

[README english version](https://github.com/cool9203/MelvorIdle-Helper/blob/master/README.md)  

# 功能介紹與預訂更新功能
- [x] 自動loot
- [x] 自動吃食物 :  
目前可以更聰明的自動吃食物了。會根據你的攻擊進度、當前血量、怪物攻擊力，來決定當前是否要吃食物。盡量地對攻擊進度影響最小。  
準備吃食物條件 : 現在血量 < (最大血量 * 0.5)  or  現在血量 <= 怪物最高攻擊力  
吃食物條件(擇一條件達成即吃食物) :  
  1. 你的攻擊進度 <= 怪物攻擊進度  
  2. 你的攻擊進度 <= 10%  
  3. 現在血量 <= 怪物最高攻擊力  
  4. 怪物最高攻擊力 == NaN and (現在血量 < (最大血量 * 0.5))
  - [ ] 下個版本 : 自動裝備食物和選擇食物，當bank沒有食物時，擇自動脫離combat 或 thieving。  
- [x] 自動燒柴
- [x] 自動賣垃圾 :  
自動販賣釣魚的垃圾，同時你可以修改或新增自動販賣的物品 [點擊這裡觀看如何修改](#如何設定販賣物品)  
- [x] quick sell junk : 和自動賣垃圾一樣，但這邊是按鈕形式，提供點擊就賣出。
- [x] quick add gloop : 快速施肥。
- [x] auto replant : 自動播種、自動施肥、自動收穫。

# 如何安裝  
### 步驟 1. 
安裝 [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  

### 步驟 2.
點擊 [melvor idle helper.user.js](https://github.com/cool9203/MelvorIdle-Helper/blob/master/melvor%20idle%20helper.user.js)  
![](https://i.imgur.com/JUx8S7T.png)  


# 如何使用這腳本  
![](https://i.imgur.com/wJdBScd.png)  
點擊 helper setting 就可以顯示設定選項, 或隱藏設定選項.


# 如何設定販賣物品  
![](https://i.imgur.com/N37Vgyz.png)  
修改20、21 行裡的ID，即可修改販賣物品  
物品ID在 [melvor wiki](https://wiki.melvoridle.com/index.php?title=Table_of_Items)  

---

# 本程式碼完全開放原始碼，歡迎取用
