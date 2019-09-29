const UICtrl = (function() {
  const UISelectors = {
    itemList: `item-list`,
    addBtn: `.add-btn`,
    updateBtn: `.update-btn`,
    deleteBtn: `.delete-btn`,
    backBtn: `.back-btn`,
    itemNameInput: `#item-name`,
    itemCaloriesInput: `#item-calories`,
    totalCalories: `.total-calories`,
    listItems: "#item-list li",
    clearBtn: `.clear-btn`
  };

  // public methods
  return {
    populateItemlist: function(items) {
      items.forEach(function(item) {
        const li = document.createElement("li");
        li.classList.add("collection-item");
        li.setAttribute("id", `item-${item.id}`);

        li.innerHTML = `        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>`;

        document.getElementById(UISelectors.itemList).appendChild(li);
      });
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // show list
      document.getElementById(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.setAttribute("id", `item-${item.id}`);

      li.innerHTML = `        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;

      document.getElementById(UISelectors.itemList).appendChild(li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function() {
      document.getElementById(UISelectors.itemList).style.display = "none";
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(function(item) {
        item.remove;
      });
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

const ItemCtrl = (function() {
  // item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // data structures
  const data = {
    items: [
      // {
      //   id: 0,
      //   name: "steak",
      //   calories: 1200
      // },
      // {
      //   id: 1,
      //   name: "cookie",
      //   calories: 400
      // },
      // {
      //   id: 2,
      //   name: "eggs",
      //   calories: 200
      // }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // calories to number
      calories = parseInt(calories);

      // create new item
      newItem = new Item(ID, name, calories);

      // add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;

      // loop through items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      // get ids
      ids = data.items.map(function(item) {
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    },
    getTotalCalories: function() {
      let total = 0;

      // loop through items and add cal
      data.items.forEach(function(item) {
        total += item.calories;
      });

      // set total cal of data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    logData: function() {
      return data;
    }
  };
})();

// APP controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  //event listeners
  const loadEventListeners = function() {
    //get ui controllers
    const UISelectors = UICtrl.getSelectors();

    // add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", ItemUpdateSubmit);

    // delete button event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", ItemSubmitDelete);

    // disable submit on enter
    document.addEventListener("keypress", function() {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }

      // clear
      document
        .querySelector(UISelectors.clearBtn)
        .addEventListener("click", clearAllItemsClick);
    });

    // edit icon event
    document
      .getElementById(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", ItemUpdateSubmit);
  };

  // add item submit
  const itemAddSubmit = function(e) {
    // get form input from ui
    const input = UICtrl.getItemInput();

    // check for name and calories input

    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      UICtrl.addListItem(newItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // edit item
  const itemEditClick = function(e) {
    e.preventDefault();
    if (e.target.classList.contains("edit-item")) {
      console.log("hi");
      // get list item id
      const listId = e.target.parentNode.parentNode.id;

      // break into array
      const listIdArr = listId.split("-");

      // get actual id
      const id = parseInt(listIdArr[1]);

      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();
    }
  };

  const ItemUpdateSubmit = function(e) {
    e.preventDefault();

    // get item input
    const input = UICtrl.getItemInput();

    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);

    UICtrl.updateListItem(updatedItem);

    UICtrl.clearEditState();
  };

  const ItemSubmitDelete = function(e) {
    e.preventDefault();
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // delete from ui
    UICtrl.deleteListItem(currentItem.id);

    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  const clearAllItemsClick = function(e) {
    e.preventDefault();
    // delete all items from data structure
    ItemCtrl.clearAllItems();

    // remove from ui
    UICtrl.removeItems();

    // hide ul
    UICtrl.hideList();
  };

  return {
    init: function() {
      // set init state
      UICtrl.clearEditState();

      // fetch items
      const items = ItemCtrl.getItems();

      // check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // populate list with items
        UICtrl.populateItemlist(items);
      }

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);

      // load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

AppCtrl.init();
