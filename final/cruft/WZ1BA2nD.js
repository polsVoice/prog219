<script src="javascripts/lib/jquery.runner.js"></script>
<script>
                                $('.runner').runner({
                                    autostart: true,
                                    countdown: true,
                                    milliseconds: false,
                                    startAt: 60000,
                                    stopAt: 0,
					/* Here is the SOLUTION */
                                    format: function millisecondsToString(milliseconds) {
                                        var oneHour = 3600000;
                                        var oneMinute = 60000;
                                        var oneSecond = 1000;
                                        var seconds = 0;
                                        var minutes = 0;
                                        var hours = 0;
                                        var result;

                                        if (milliseconds >= oneHour) {
                                            hours = Math.floor(milliseconds / oneHour);
                                        }

                                        milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

                                        if (milliseconds >= oneMinute) {
                                            minutes = Math.floor(milliseconds / oneMinute);
                                        }

                                        milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

                                        if (milliseconds >= oneSecond) {
                                            seconds = Math.floor(milliseconds / oneSecond);
                                        }

                                        milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

                                        if (hours > 0) {
                                            result = (hours > 9 ? hours : "0" + hours) + ":";
                                        } else {
                                            result = "00:";
                                        }

                                        if (minutes > 0) {
                                            result += (minutes > 9 ? minutes : "0" + minutes) + ":";
                                        } else {
                                            result += "00:";
                                        }

                                        if (seconds > 0) {
                                            result += (seconds > 9 ? seconds : "0" + seconds);
                                        } else {
                                            result += "00";
                                        }
                                        
                                        return result;
                                    }  
                                    
                                }).on('runnerFinish', function(eventObject, info) {
                                    showAlert();
                                    document.forms['form_1'].submit();
                                });

                                function beforeSubmit()
                                {


                                    if (confirm('Do you really want to terminate it?')) {
                                        $("#my_time").val($('.runner').runner('getCurrentTime'));
                                        document.forms['myform'].submit();
                                    }
                                    else
                                        return false;

                                }

</script>