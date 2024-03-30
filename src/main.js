const get_student_data = document.getElementById("create_student_data");
const update_student_data= document.getElementById("update_student_data");
const studenDatatList = document.getElementById("studentList");
const error_msg = document.querySelector(".msg");
const student_data = document.querySelector(".student_data");
const create_btn = document.querySelector(".create_btn");
const update_btn = document.querySelector(".update_btn");

// now submit form

get_student_data.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);

  const { name, email, phone, location, photo } = Object.fromEntries(form_data);

  // form validation

  if (!name || !email || !phone || !location || !photo) {
    error_msg.innerHTML = alertMessage("All fields are required...");
  } else if (!isEmail(email)) {
    error_msg.innerHTML = alertMessage("Invalid email address...", "warning");
  } else if (!isPhone(phone)) {
    error_msg.innerHTML = alertMessage("Invalid phone number...", "warning");
  } else {
    sendDataLs("students", {
      id: unique_id(),
      name: name,
      email: email,
      phone: phone,
      location: location,
      photo: photo,
      createdAt: Date.now(),
      status: 1,
    });

    error_msg.innerHTML = alertMessage("Student data created", "success");
    e.target.reset();
    studentDataList()
    create_btn.click()

  }
};

// show student list

const studentDataList = () => {
  let student = getDataLs("students");
  let studentList = "";

  if (student) {
    student.forEach((item, index) => {
      studentList += `<tr>
                      <td>${index + 1}</td>
                      <td>
                        <img src="${item.photo}" alt="" srcset="">
                      </td>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${timeAgo(item.createdAt)}</td>
                      <td>${item.location}</td>
                      <td>
                        <button data-bs-toggle="modal" data-bs-target="#show-student" class="btn btn-sm btn-primary" onclick="singleDataShow('${
                          item.id
                        }')"><i class="fa-solid fa-eye"></i></button>
                        <button onclick="editForm('${item.id}')" class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#update-student"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteSingleData('${
                          item.id
                        }')"><i class="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>`;
    });
  } else {
   
        studentList = `<tr>
       <td colspan="7" class="text-center">Data not found !</td>
      </tr>`;
  
  }
  studenDatatList.innerHTML = studentList;
};

studentDataList();

const singleDataShow = (id) => {
  const data = getDataLs("students");
  data.forEach((item) => {
    if (item.id == id) {
      const { name, location, photo, phone } = item;
      student_data.innerHTML = `
              <img src="${photo}" alt="" srcset="">
              <h3>${name}</h3>
              <p>${location}</p>
              <p>${phone}</p>`;
    }
  });
};

const deleteSingleData = (id) => {
  const data = getDataLs("students");
  const conf = confirm("Are You Sure ?");
  if (conf) {
    if (data) {
      let singleData = data.filter((item) => {
        return item.id != id;
      });

      localStorage.setItem("students", JSON.stringify(singleData));
      studentDataList();
    }
  }
};


const editForm = (id)=>{
  const data = getDataLs('students');
  if(data){
   const {name,email,phone,location,photo} = data.find(item=> item.id ==id)

   update_student_data.querySelector("input[placeholder='id']").value = id
   update_student_data.querySelector("input[placeholder='Name']").value = name
   update_student_data.querySelector("input[placeholder='Email']").value = email
   update_student_data.querySelector("input[placeholder='Phone']").value = phone
   update_student_data.querySelector("input[placeholder='Location']"). value = location
   update_student_data.querySelector("input[placeholder='Photo']").value =photo
    
  }
}


update_student_data.onsubmit = (e)=>{
  e.preventDefault()
  const get_data = new FormData(update_student_data)
  const  {inputid,name,phone,photo,location,email} = Object.fromEntries(get_data);
  

  const data =getDataLs("students")??[];
  
  const updateData= data.map( item => {
    if(item.id===inputid)
    {
      return {
        ...item,
        name,phone,photo,location,email
      }
    }else{
      return item
    }
  })

  localStorage.setItem("students",JSON.stringify(updateData))
  update_btn.click()
  studentDataList();
  
}