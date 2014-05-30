(function()
{
    var $ = function(id)
    {
        return document.getElementById(id);
    };

    var cents = $("cents");
    var makeChange = function() 
    {
        var change = cents.value;
        var fields = document.querySelectorAll("input[type=text]");
        
        //is input a number and within bounds?
        if (change > 99 || change < 0 || isNaN(change))
        {
            alert("Please enter a value between 0 and 99");
            for (var i = 0, ii = fields.length; i < ii; i++)
            {
                fields[i].value = "";
            }
            cents.focus();
        }
        else
        {
            //get integer, discard decimals
            $("quarters").value = Math.floor(change / 25);
            change %= 25;           //get remainder
            $("dimes").value = Math.floor(change / 10);
            change %= 10;
            $("nickels").value = Math.floor(change / 5);
            change %= 5;
            $("pennies").value = Math.floor(change / 1);
            cents.focus();
        }
    };

    window.onload = function()
    {
        cents.focus();
        var calcButton = $("calculate");
        calcButton.addEventListener("click", makeChange, false);
    };
}());
