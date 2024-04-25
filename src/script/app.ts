// ----------------------load Data------------------------- //

//Define Array to Store Data from local storage
type userObj = { name: string, family: string, identity: string, phone: string }

let siteUsers: userObj[] = []
let usersTableBody: HTMLTableElement | null = document.querySelector(".user-body")

// getItem From localStorage
let getItem = localStorage.getItem("Users")
//conditon for skip null localStorage
if (getItem != null && getItem != "") {
    //parse datas to push it in array
    let loadUser: object = JSON.parse(getItem)
    //push all data in siteUser array
    Object.values(loadUser).forEach((item) => {
        siteUsers.push(item)
    })
}

loadData(siteUsers)

// ----------------------Elements And Vars------------------------- //
let closeModal: NodeList = document.querySelectorAll(".close-modal")

let addUserBtns: NodeList = document.querySelectorAll("#add-user-btn")
let addUserModal: HTMLDivElement | null = document.querySelector(".add-modal")

let visitUserBtns: NodeList = document.querySelectorAll("#visit-btn")
let visitUserContainer: HTMLElement | null = document.querySelector(".visit-container") as HTMLElement
let visitUserModal = document.querySelector(".visit-modal")

let editUserBtns: NodeList = document.querySelectorAll("#edit-btn")
let editUserForm: HTMLElement | null = document.querySelector(".edit-form") as HTMLElement
let editUserModal = document.querySelector(".edit-modal")

let removeUserBtns: NodeList = document.querySelectorAll("#remove-btn")
let removeUserModal: HTMLDivElement | null = document.querySelector(".remove-modal")

let locationUserBtns: NodeList = document.querySelectorAll("#location-btn")
let locationUserModal: HTMLDivElement | null = document.querySelector(".location-modal")

let statisticUserBtns: NodeList = document.querySelectorAll("#statistic-btn")
let statisticUserModal: HTMLDivElement | null = document.querySelector(".statistic-modal")

const ctx: any = document.getElementById('myChart');

//add form inputs 
let addUserForm: HTMLButtonElement | null = document.querySelector("#add-form__btn")
let addInputName: HTMLInputElement | null = document.querySelector(".add-form__name")
let addInputFamily: HTMLInputElement | null = document.querySelector(".add-form__family")
let addInputIdentity: HTMLInputElement | null = document.querySelector(".add-form__identity")
let addInputPhone: HTMLInputElement | null = document.querySelector(".add-form__phone")

//search form inputs 
let searchUserForm: HTMLFormElement | null = document.querySelector(".search")
let searchInputName: HTMLInputElement | null = document.querySelector(".search__name")
let searchInputFamily: HTMLInputElement | null = document.querySelector(".search__family")
let searchInputIdentity: HTMLInputElement | null = document.querySelector(".search__identity")
let searchInputPhone: HTMLInputElement | null = document.querySelector(".search__phone")
let searchBtn: HTMLButtonElement | null = document.querySelector(".search__btn")

let removeUser: HTMLButtonElement | null = document.querySelector("#remove-user")
let removeNotUser: HTMLButtonElement | null = document.querySelector("#remove-nuser")

let editFormBtn: HTMLButtonElement | null = document.querySelector("#edit-form__btn")


// ----------------------Show and hide modals with function------------------------- //

//this function is for show modals for all actions
function actionsHandler(btns, modal, callback) {
    btns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            modal?.classList.add("modal-show")
            callback(index)
        })
    })
}

//this function is for hide modals for some actions
function closeHandler(index: number, modal: HTMLDivElement) {
    closeModal[index]?.addEventListener("click", () => {
        modal?.classList.remove("modal-show")
    })
}

function test() {
}

//show add User modal
actionsHandler(addUserBtns, addUserModal, test)
//hide add User modal
if (addUserModal) {
    closeHandler(0, addUserModal)
}

//show add visit modal
actionsHandler(visitUserBtns, visitUserModal, visitHandler);
//show add visit modal
function closeVisit() {
    visitUserContainer!.innerHTML = ""
    visitUserModal?.classList.remove("modal-show")
}

//show add edit modal
actionsHandler(editUserBtns, editUserModal, editHandler)
//show add edit modal
function closeEdit() {
    editUserForm!.innerHTML = ""
    editUserModal?.classList.remove("modal-show")
}

//show add location modal
actionsHandler(locationUserBtns, locationUserModal, test)
//show add location modal
if (locationUserModal) {
    closeHandler(1, locationUserModal)
}
//show add remove modal
actionsHandler(removeUserBtns, removeUserModal, removeHandler)
//show add remove modal
if (removeUserModal) {
    closeHandler(2, removeUserModal)
}

//show add statistic modal
actionsHandler(statisticUserBtns, statisticUserModal, statisticHandler)
//show add statistic modal
if (statisticUserModal) {
    closeHandler(3, statisticUserModal)
}

searchBtn?.addEventListener("click", () => {
    let searchedUser: userObj[] = siteUsers
    let tHeadStr = `
        <tr class="user-row">
            <th>ردیف</th>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>کد ملی</th>
            <th>شماره تلفن</th>
            <th>عملیات</th>
        </tr>`;

    if (searchInputName != null && searchInputName.value != "" && searchInputFamily != null && searchInputFamily.value != "" || searchInputIdentity != null && searchInputIdentity.value != "" || searchInputPhone != null && searchInputPhone.value != "") {
        searchedUser = siteUsers.filter(function (user) {
            return user.name == searchInputName?.value && user.family == searchInputFamily?.value || user.identity == searchInputIdentity?.value || user.phone == searchInputPhone?.value;
        })
    } else {
        alert("نام و نام خانوادگی را وارد کنید")
    }

    if (searchInputName != null && searchInputName.value == "" && searchInputFamily != null && searchInputFamily.value == "" && searchInputIdentity != null && searchInputIdentity.value == "" && searchInputPhone != null && searchInputPhone.value == "") {
        loadData(siteUsers)
    }

    usersTableBody!.innerHTML = tHeadStr;

    loadData(searchedUser)

})
// ----------------------actions in modals------------------------- //

//add user action
addUserForm?.addEventListener("click", () => {
    //condition to check inputs are not null
    if (addInputName != null && addInputName.value != "" && addInputFamily != null && addInputFamily.value != "" && addInputIdentity != null && addInputIdentity.value != "" && addInputPhone != null && addInputPhone.value != "") {
        //create an object 
        let user = {
            name: addInputName.value,
            family: addInputFamily.value,
            identity: addInputIdentity.value,
            phone: addInputPhone.value
        }
        //save this object in our array
        siteUsers.push(user)
        //save our array in local storage
        localStorage.setItem("Users", JSON.stringify(siteUsers))
        //reload page
        location.reload()
    } else {
        alert(`one input or more is null
        please full all inputs`)
    }
})

//visit user action
function visitHandler(index) {
    //create jsx to show our user in visit modal
    let dataVisit = `
    <img class="close-modal " onclick="closeVisit()" src="../../image/svg/close.svg" alt="Close" />
    <div>
        <h3>نام : </h3>
        <p>${siteUsers[index].name}</p>
    </div>
    <div>
        <h3>نام خانوادگی : </h3>
        <p>${siteUsers[index].family}</p>
    </div>
    <div>
        <h3>کد ملی : </h3>
        <p>${siteUsers[index].identity}</p>
    </div>
    <div>
        <h3>شماره تلفن : </h3>
        <p>${siteUsers[index].phone}</p>
    </div>`;

    //add our jsx in our html element
    visitUserContainer?.insertAdjacentHTML("beforeend", dataVisit)
}

//remove user action
function removeHandler(index) {

    //set listener for remove btn 
    removeUser?.addEventListener("click", () => {
        //remove that data with splice method 
        siteUsers.splice(index, index + 1)

        //save our new array in our local storage and reload page
        localStorage.setItem("Users", JSON.stringify(siteUsers))
        location.reload()
    })

}

//edit user to show action
function editHandler(index) {

    //create jsx to show our user data in edit modal with index
    let dataEdit = `
    <img class="close-modal" onclick="closeEdit()" src="../../image/svg/close.svg" alt="Close" />
    <div>
        <input class="edit-form__name" type="text" value = ${siteUsers[index].name} placeholder="نام" />
        <input class="edit-form__family" type="text" value = ${siteUsers[index].family} placeholder="نام خانوادگی" />
    </div>
    <div>
        <input class="edit-form__identity" type="text" value = ${siteUsers[index].identity} placeholder="کد ملی" />
        <input class="edit-form__phone" type="text" value = ${siteUsers[index].phone} placeholder="شماره تلفن" />
    </div>
    <button class="edit-form__btn" onclick = "editFormFun(${index})" type="button">انجام ویرایش</button>
    `
    //add our jsx in our html element
    editUserForm?.insertAdjacentHTML("afterbegin", dataEdit)
}

//edit user action
function editFormFun(index) {
    //get data from inputs
    let editInputName: HTMLInputElement | null = document.querySelector(".edit-form__name")
    let editInputFamily: HTMLInputElement | null = document.querySelector(".edit-form__family")
    let editInputIdentity: HTMLInputElement | null = document.querySelector(".edit-form__identity")
    let editInputPhone: HTMLInputElement | null = document.querySelector(".edit-form__phone")

    //set condition to our inputs that are not null
    if (editInputName != null && editInputName.value != "" && editInputFamily != null && editInputFamily.value != "" && editInputIdentity != null && editInputIdentity.value != "" && editInputPhone != null && editInputPhone.value != "") {
        //set new data in our array which we get from local storage
        siteUsers[index].name = editInputName.value;
        siteUsers[index].family = editInputFamily.value;
        siteUsers[index].identity = editInputIdentity.value;
        siteUsers[index].phone = editInputPhone.value;

        //save new data in our local storage and reload page
        localStorage.setItem("Users", JSON.stringify(siteUsers))
        location.reload()
    } else {
        alert("Fill all inputs")
    }
}

// statistic action
function statisticHandler() {

    // for test we set random number in vars
    let num1 = Math.floor(Math.random() * 100)
    let num2 = Math.floor(Math.random() * 100)
    let num3 = Math.floor(Math.random() * 100)
    let num4 = Math.floor(Math.random() * 100)

    //we set our data in data 
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['امروز', 'دیروز', 'دو روز قبل', 'سه روز قبل'],
            datasets: [{
                label: '# of Votes',
                data: [num1, num2, num3, num4],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //hide statistic modal action
    closeModal[3].addEventListener("click", () => {
        myChart.destroy();
    })

}

// ----------------------devide functions------------------------- //

function loadData(array: userObj[]) {

    let counter = 0
    //condition for data which not null
    if (array) {
        //create row for each data in out table 
        array.forEach((user) => {
            usersTableBody?.insertAdjacentHTML("beforeend",
                `<tr class="user-row">
                <td>${counter}</td>
                <td>${user.name}</td>
                <td>${user.family}</td>
                <td>${user.identity}</td>
                <td>${user.phone}</td>
                <td class="user-row__action">
                    <img id="visit-btn" src="../../image/svg/visit.svg" alt="visit" />
                    <img id="edit-btn" src="../../image/svg/edit.svg" alt="edit" />
                    <img id="location-btn" src="../../image/svg/location.svg" alt="location" />
                    <img id="remove-btn" src="../../image/svg/remove.svg" alt="remove" />
                    <img id="statistic-btn" src="../../image/svg/statistic.svg" alt="statistic" />
                </td>
                </tr>`
            )
            counter += 1
        })
    }
}