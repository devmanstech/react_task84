$(function() {

$.getScript("../js/uxframe-1.4.2.min.js");

var form = $("#request_access").show();

// register everything since we are no longer using the js.min file
$UXF.registerAll();

jQuery.validator.addMethod("hostid_length", function(value, element) {
    var length = value.trim().length;
    return this.optional(element) || (length === 8 || length === 12 || length === 20);
}, "Valid HostIDs should only contain 8, 12, or 20 alphanumeric characters.");

jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[A-Z0-9]+$/i.test(value.trim());
}, "Value should contain only alphanumeric values.");

var extraPages = []
var email = "";
var subject = "";
var emailBody = "";

var errorMessage = true;

function checkError() {
	updateSubject();
	if(errorMessage == true) {
		$("#Error").show();
	} else if (errorMessage == false) {
		$("#Error").hide();
	}
}




function updateSubject() {
	var sub = "Focus Tools | Request Access | {0} | {1}".format(license_request.name, license_request.racf);
	var error_subject = "\xa0\xa0\xa0\xa0" + "-Use subject line: \"" + sub + "\"";
	$("#subject_line").text(error_subject);
}

function checkAccess(userID) {
	$.ajax({
	  dataType: "json",
	  url: "http://focus.GoogleInternal.com/requestaccess/GetPermissions/userID=".concat(userID),
	  //url: "/requestaccess.svc/GetPermissions/userID=".concat(userID),
	  success: function(data) {
		license_request.engineering_access = data.SecuredEngineeringAccess;
		license_request.programming_access = data.SecuredProgrammingAccess;
		license_request.racf_access = data.UserID;
		errorMessage = false;
	  },
	  error: function(xhr, textStatus, errorThrown) {
		license_request.access_error = JSON.parse(xhr.responseText);
		errorMessage = true;
	  }
	});
}

function submitForm() {
	$.ajax({
	  type: "POST",
	  dataType: "HTML",
	  contentType: "application/json",
	  url: "http://focus.GoogleInternal.com/requestaccess/submit/",
	  //url: "/requestaccess.svc/submit/",
	  data: JSON.stringify(license_request),
	  success: function(data) {
	  	errorMessage = false;
		successAlert();
		setTimeout(function() {
			window.location.href = 'http://focus.GoogleInternal.com/tools/';
		}, 2500);
	  },
	  error: function(xhr, textStatus, errorThrown) {
		window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
	  }
	});
}

var successAlert;

function successAlert() {
	successAlert = $UXF.FloatAlert({
		text: "Access Request successfully submitted!", // Message text
		//timeout: 2000          							// Length of timeout (ms), default 5000
	});
}

function pageToIndex(page) {
    switch (page) {
        case "Overview": return 0;
        case "UserInfo": return 1;
        case "MachineInfo": return 2;
        case "DepartmentInfo": return 3;f
        case "ToolInfo": return 4;
        case "DevX":
        case "ECULP":
        case "PayloadViewer":
            var offset = extraPages.indexOf(page);
            return (index === -1) ? -1 : 5 + offset;
        case "Comments":
            return 5 + extraPages.length;
        case "Confirm":
            return 6 + extraPages.length;
    }
}

function indexToPage(index) {
    var step = form.steps("getStep", index);
    return step.title;
}

var devxStep = {
        title: "DevX",
        contentMode: "async",
        contentUrl: "steps/devx.html"
};

var eculpStep = {
        title: "ECULP",
        contentMode: "async",
        contentUrl: "steps/eculp.html"
};

var payloadViewerStep = {
        title: "PayloadViewer",
        contentMode: "async",
        contentUrl: "steps/payloadviewer.html"
};

var pagesCompleted = -1;

function updateProgress(currentIndex) {
    if (currentIndex > pagesCompleted) {
        pagesCompleted = currentIndex;
    }
    $("#request_access").find("ul[role='tablist']").children("li:eq({0})".format(currentIndex)).addClass("completed");
}

function percentEncode(unsafe) {
    return unsafe
        .replace(/&/g, "%26");
}

var license_request = {
	access_error: null,
	engineering_access: null,
	programming_access: null,
	racf_access: null,
	svn_access: null,
    name: null,
    racf: null,
    request: null,
    hostid: null,
    license_usage: null,
    tools: null,
    other_request: null,
    business_case: null,
    comments: null
};

function updateLicenseRequest(currentIndex) {
    var page = indexToPage(currentIndex)
    switch (page) {
        case "Overview": break;
        case "User Info":
            license_request.name = $("#user_name").val();
            license_request.racf = $("#racf").val();
            license_request.request = $("#request_type").find("input[name=request_type]:checked").val();
            break;
        case "Machine Info":
            license_request.hostid = $("#hostid").val();
            license_request.license_usage = $("#license_usage").find("input[name=license_usage]:checked").val();

            $("#svn_show").click(function(){
                $("#svnaccess").show();
                $("#svn_access").prop("checked", false);
            });
            $("#svn_hide").click(function(){
                $("#svnaccess").hide();
                $("#svn_access").prop("checked", false);
            });

            break;
        case "Department Info":
            license_request.group_description = $("#group_description").val();
            license_request.group_location = $("#businessunit").val();
            license_request.jdpsfocus = $("#focus-jdps").find("input[name=focus_member]:checked").val();
			if ($("#svn_access").prop("checked") == true) {
				license_request.svn_access = "Yes";
			} else {
				license_request.svn_access = "No";
			}				

            break;
        case "Tool Info":
            license_request.tools = $("#toolinfo").find("input[type='checkbox']:checked").map(function() {
                return $(this).val();
            }).get();
            license_request.other_request = $("#other_request").val();
            license_request.business_case = $("#business_case").val();
            break;
        case "DevX":
            license_request.devx = $("#devx_questions").find("input:checked").map(function() {
                return $(this).val();
            }).get();
            break;
        case "ECULP":
            license_request.eculp = $("#eculp_questions").find("input:checked").map(function() {
                return $(this).val();
            }).get();
            break;
        case "PayloadViewer":
            license_request.payloadviewer = $("#payloadviewer_questions").find("input:checked").map(function() {
                return $(this).val();
            }).get();
            break;
        case "Comments":
            var comments = $("#additional_comments").val();
            license_request.comments = comments;
            break;
        case "Confirm": break;
    }
}

function updateDynamicContent(currentIndex, newIndex) {
    if (indexToPage(currentIndex) === "Tool Info") {
        // Add DevX if checked
        var index = extraPages.indexOf("DevX");
        if ($("#devx").prop("checked") && index === -1) {
            var offset = currentIndex + 1 + extraPages.length;
            extraPages.push("DevX")
            form.steps("insert", offset,  devxStep);
        } else if (!$("#devx").prop("checked") && index !== -1) {
            extraPages.splice(index,1);
            form.steps("remove", currentIndex + 1 + index);
            if (license_request.devx) {
                delete license_request.devx;
            }
        }

        // Add ECULP if checked
        index = extraPages.indexOf("ECULP");
        if (($("#eculp").prop("checked") || $("#ecuprogrammer").prop("checked")) && index === -1) {
            var offset = currentIndex + 1 + extraPages.length;
            extraPages.push("ECULP")
            form.steps("insert", offset,  eculpStep);
        } else if (!$("#eculp").prop("checked") && !$("#ecuprogrammer").prop("checked") && index !== -1) {
            extraPages.splice(index,1);
            form.steps("remove", currentIndex + 1 + index);
            if (license_request.eculp) {
                delete license_request.eculp;
            }
        }

        // Add PayloadViewer if checked
        index = extraPages.indexOf("PayloadViewer");
        if ($("#payloadviewer").prop("checked") && index === -1) {
            var offset = currentIndex + 1 + extraPages.length;
            extraPages.push("PayloadViewer")
            form.steps("insert", offset,  payloadViewerStep);
        } else if (!$("#payloadviewer").prop("checked") && index !== -1) {
            extraPages.splice(index,1);
            form.steps("remove", currentIndex + 1 + index);
            if (license_request.payloadviewer) {
                delete license_request.payloadviewer;
            }
        }
    }

    if (indexToPage(newIndex) === "Confirm") {
        var json = JSON.stringify(license_request, null, '\t');
        $("#license_request").html("RequestAccess" + json);
    }
}

form.steps({
    headerTag: "h2",
	bodyTag: "section",
	transitionEffect: "fade",
    stepsOrientation: "vertical",
	labels: {
		   cancel: "Cancel",
		   current: "current step:",
		   pagination: "Pagination",
		   finish: "Finish",
		   next: "Next",
		   previous: "Prev",
		   loading: "Loading ..."
	},
	onStepChanging: function (event, currentIndex, newIndex)
		{
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex)
			{
				return true;
			}
			
			// check for early returns on any of the pages
            var page = indexToPage(currentIndex);
            switch (page) {
                case "Overview": break;
                case "User Info": break;
                case "Machine Info": break;
                case "Department Info": break;
                case "Tool Info": break;
                case "DevX": break;
                case "ECULP": break;
                case "PayloadViewer": break;
                case "Comments": break;
                case "Confirm": break;
            }
			
			form.validate().settings.ignore = ":disabled,:hidden";
            var valid = form.valid();
            if(valid) {
                updateProgress(currentIndex);
                updateLicenseRequest(currentIndex);
                updateDynamicContent(currentIndex, newIndex);
				
				if(indexToPage(currentIndex) == "User Info") {
					license_request.engineering_access = null;
					license_request.programming_access = null;
					license_request.racf_access = null;
					license_request.access_error = null;
					
					checkAccess(license_request.racf);
				}
            }                        

			// if we are on the confirm page, then we need to check for the error message			
			if (page = "Confirm") {
				checkError();
			}
			
            return valid;
		},
        onContentLoaded: function (event, currentIndex) {
            var step = form.steps("getStep", currentIndex);
            switch(step.title) {
                case "DevX":
                case "ECULP":
                case "PayloadViewer":
                    // Re-register event handlers since we've pulled in new DOM content
                    // otherwise, dynamic content won't toggle radio/checkboxes if we click on their labels
                    $UXF.Register.RadioCheckArea();

                    // ensure async content is not fetched multiple times
                    // https://github.com/rstaib/jquery-steps/issues/28
                    // a more complete answer might be to leverage the saveState option
                    // but this requires jQuery.cookies integration, which we haven't done yet.
                    step.contentLoaded = true;
                    break;
                default: break;
            }
            return true;
        },
		onStepChanged: function (event, currentIndex, priorIndex)
		{
			//nothing to do here
		},
		onFinishing: function (event, currentIndex)
		{
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
		},
		onFinished: function (event, currentIndex)
        {
            // add final check
            $("#request_access").find("ul[role='tablist']").children("li:eq({0})".format(pageToIndex("Confirm"))).addClass("completed");

            email = "JDPS_ECULP@JohnGoogleInternal.com";
            subject = "Focus Tools | Request Access | {0} | {1}".format(license_request.name, license_request.racf);
			
            var emailBodyTemplate = "User Info <br>" +
                                    "================<br>" +
                                    "Name: {0}<br>".format(license_request.name) +
                                    "RACF ID: {0}<br>".format(license_request.racf) +
                                    "Request: {0}<br><br>".format(license_request.request);
									
			emailBodyTemplate += "Access Info <br>" +
                                 "================<br>" +
								 "Needs SVN Access: {0}<br>".format(license_request.svn_access);
			if (!license_request.access_error) {					 
								 emailBodyTemplate += 
								 "Engineering Access: {0}<br>".format(license_request.engineering_access) +
								 "Programming Access: {0}<br>".format(license_request.programming_access) +
								 "RACF Verification: {0}<br><br>".format(license_request.racf_access);							 
			} else {
								 emailBodyTemplate += 
								 "Error: {0}<br><br>".format(license_request.access_error);
			}
			
            emailBodyTemplate += "Machine Info <br>" +
                                 "================<br>" +
                                 "HostID: {0}<br>".format(license_request.hostid) +
                                 "Usage: {0}<br><br>".format(license_request.license_usage);

            emailBodyTemplate += "Group Info <br>" +
                                 "================<br>" +
                                 "Group Description: {0}<br>".format(license_request.group_description) +
                                 "Group Location: {0}<br>".format(license_request.group_location) +
								 "JDPS/FOCUS: {0}<br><br>".format(license_request.jdpsfocus);

            if (license_request.tools || license_request.other_request) {
                emailBodyTemplate += "Requested Tools <br>" +
                                     "================<br>";
                var tools = "";
                if (license_request.tools) {
                    tools += license_request.tools.join("<br>");
                    tools += "<br>"
                }
                if (license_request.other_request) {
                    tools += "{0}<br>".format(license_request.other_request);
                }
                tools += "<br>"

                emailBodyTemplate += tools;
            }

            emailBodyTemplate += "Business Case <br>" +
                                 "================<br>" +
                                 "{0}".format(license_request.business_case) +
                                 "<br><br>";

            emailBodyTemplate += "Comments <br>" +
                                 "================<br>" +
                                 "{0}".format(license_request.comments) +
                                 "<br><br>";

            if (license_request.devx) {
                emailBodyTemplate += "DevX <br>" +
                                     "================<br>";
                emailBodyTemplate += license_request.devx.join("<br>");
                emailBodyTemplate += "<br><br>"
            }

            if (license_request.eculp) {
                emailBodyTemplate += "ECULP <br>" +
                                     "================<br>";
                emailBodyTemplate += license_request.eculp.join("<br>");
                emailBodyTemplate += "<br><br>"
            }

            if (license_request.payloadviewer) {
                emailBodyTemplate += "PayloadViewer <br>" +
                                     "================<br>";
                emailBodyTemplate += license_request.payloadviewer.join("<br>");
                emailBodyTemplate += "<br><br>"
            }

            // escape '&'
            emailBody = percentEncode(emailBodyTemplate.replace(/<br>/g, "%0D%0A"));
			
			submitForm();
		}
    }).validate({        
        errorPlacement: function(error, element) {
            if (element.attr("type") === "radio") {
                // assumes radio buttons are following GoogleInternal standard and
                // live inside an <ul><li><input type="radio">...</input></li></ul>
                error.insertAfter(element.parent().parent());
            } else if (element.attr("type") === "checkbox") {
                // assumes checkbox items are following GoogleInternal standard and
                // live inside an <ul><li><input type="checkbox">...</input></li></ul>
                error.insertAfter(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        },
		rules: {
            // UserInfo
            user_name: {
                required: true,
                minlength: 2
            },
            racf: {
                required: true,
                minlength: 2,
                alphanumeric: true,
                remote: {
                    dataType: "json",
                    contentType: "application/json",
					url: "http://focus.GoogleInternal.com/requestaccess/CheckRACF",
                    type: "get"
                }									
            },
            hostid: {
                required: true,
                hostid_length: true,
                alphanumeric: true
            }				
        },
        messages: {
            racf: { remote: "* Invalid RACF" }
    	}			
    });

})
