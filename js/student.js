

function emailIsValid (email){
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}

function save(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById("male").value;
    } else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value;
    }
    // console.log(fullname, email, phone, address, gender);
        if(_.isEmpty(fullname)) {
            fullname='';
            document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập lại tên!';
        } else{
            document.getElementById('fullname-error').innerHTML = '';    
        }

        if(_.isEmpty(email)) {
            email='';
            document.getElementById('email-error').innerHTML = 'Vui lòng nhập lại email!';
        } else if(!emailIsValid(email))  {
            document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';    
        } else {
            document.getElementById('email-error').innerHTML = '';
        }

        if(_.isEmpty(phone)) {
            phone ='';
            document.getElementById('phone-error').innerHTML = 'Vui lòng nhập lại số điện thoại!';
        } else{
            document.getElementById('phone-error').innerHTML = '';    
        }

        if(_.isEmpty(address)) {
            address='';
            document.getElementById('address-error').innerHTML = 'Vui lòng nhập lại địa chỉ!';
        } else{
            document.getElementById('address-error').innerHTML = '';    
        }

        if(_.isEmpty(gender)) {
            gender='';
            document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
        } else{
            document.getElementById('gender-error').innerHTML = '';    
        }
        
        if (fullname && email && phone && address && gender ) {
            
        let students =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :[];

           
            students.push ({
                        fullname: fullname,
                        email: email,
                        phone: phone,
                        address: address,
                        gender: gender,
                    });

                   localStorage.setItem('students', JSON.stringify(students));

                   this.renderListStudent();

                
                
                }
    }

function renderListStudent(){
    let students =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :[];
    
    // console.log(students.length);
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    } else {
        document.getElementById('list-student').style.display = 'block';

    }

    let tableContent = `<tr>
    <td width = '30'>#</td>
    <td>Họ và tên</td>
    <td>Email</td>
    <td>Điện thoại</td>
    <td>Giới tính</td>
    <td>Địa chỉ</td>
    <td>Hành động</td></tr>`;


    students.forEach((student, index) => {
        let studentId= index;
        let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';   
        index++; 
        tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
            <a href="#" onclick='editStudent(${studentId})'>Edit</a> | <a href="#" onclick='deleteStudent(${studentId})'>Delete</a>
            </td>
        </tr>`;

    })
    document.getElementById('grid-students').innerHTML = tableContent; 

}

function deleteStudent(id) {
    let students =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :[];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}

function editStudent(id){
    console.log(id);
}