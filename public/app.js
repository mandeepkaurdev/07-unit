const receiveEntry = function () {


    $.getJSON('/api/applist').then(function (data) {


        const variable = data.map((element) =>


            `<input type="checkbox" class="checkbox" ${element.completed ? 'checked' : ''} data-id=${element._id}></input>
        

        <li>${element.item}</li>

        
        <i class="fas fa-times" id='${element._id}'></i><br>`)


        $('#todolistapp').html(variable);


        $('.fa-times').on('click', dataDeleted);


        $('.checkbox').on('click', function (event) {


            const ID = $(event.target).attr('data-id');


            $.ajax({ url: `/api/update/${ID}`, method: 'PUT' })


                .then(function (res) {


                    receiveEntry();

                })
                .catch(function (err) {


                    alert(err);
                })
        })
    })

}



const dataSubmitted = function (event) {


    event.preventDefault();


    const data = $('input').val().trim();


    $.ajax({ url: "/add", method: "POST", data: { item: data } }).then(function (res) {


        receiveEntry();
    });
}



const dataDeleted = function (event) {


    event.preventDefault();


    const id = event.target.id;


    $.ajax({ url: `/delete/${id}`, method: "DELETE" }).then(function () {


        receiveEntry();

    });
}



receiveEntry();



// Click listener for the submit button
$('form').on('submit', dataSubmitted);