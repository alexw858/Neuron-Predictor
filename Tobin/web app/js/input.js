$(function() {

  $("#inputForm input,#inputForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var varone = $("input#one").val();
      //console.log(varone)
      var vartwo = $("input#two").val();
      //console.log(vartwo)
      var varthree = $("input#three").val();
      //console.log(varthree)
      var varfour = $("input#four").val();
      //console.log(varfour)
      var varfive = $("input#five").val();
      //console.log(varfive)
      var varsix = $("input#six").val();
      //console.log(varsix)

      user_data = ([varone, vartwo, varthree, varfour, varfive, varsix])
      console.log(user_data)
    }
  })
  
 
});

      // $this = $("#inputsubmit");
      // $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      // $.ajax({
      //   // ****** maybe conection to python will go here in the url?? 
      //   url: "././mail/contact_me.php",
      //   type: "POST",
      //   data: {
      //     input_resistance: varone,
      //     resting_membrane_potential: vartwo,
      //     spike_threshold: varthree,
      //     spike_halfwidth: varfour,
      //     spike_amplitude: varfive,
      //     vmembrane_time_constant: varsix
      //   },
        
        // cache: false,
        // success: function() {
        //   // Success message
        //   $('#success').html("<div class='alert alert-success'>");
        //   $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        //     .append("</button>");
        //   $('#success > .alert-success')
        //     .append("<strong> data sent. </strong>");
        //   $('#success > .alert-success')
        //     .append('</div>');
        //   //clear all fields
        //   $('#inputForm').trigger("reset");
        // },
        // error: function() {
        //   // Fail message
        //   $('#success').html("<div class='alert alert-danger'>");
        //   $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        //     .append("</button>");
        //   $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        //   $('#success > .alert-danger').append('</div>');
        //   //clear all fields
        //   $('#inputForm').trigger("reset");
        // },
        // complete: function() {
        //   setTimeout(function() {
        //     $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
        //   }, 1000);
        // }
//       });
//     },
//     filter: function() {
//       return $(this).is(":visible");
//     },
//   });

//   $("a[data-toggle=\"tab\"]").click(function(e) {
//     e.preventDefault();
//     $(this).tab("show");
//   });
// });

// /*When clicking on Full hide fail/success boxes */
// $('#name').focus(function() {
//   $('#success').html('');
