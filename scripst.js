const data=[];
function getData(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(function(res){
            if(res.ok){
                res.json().then(function(response){
                    data.push(...response["quotes"]);
                    newQuote()
                })
        }
    }); return data;
}getData();

const colors=['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

function alternate(param){
    return Math.floor(Math.random() * param)
};

function fadeOut(){
    $("#text, #author").addClass("animate__animated animate__fadeOut");
    setTimeout(newQuote, 1000);
};

function newQuote(){
    let color=alternate(colors.length);
    $("html body").animate(
        {
            backgroundColor: colors[color],
            color:colors[color]
        },
        1000
    );
    $("button, a").animate({ backgroundColor:colors[color] }, 1000);
    
    $("#text, #author").removeClass("animate__animated animate__fadeOut");
    $("#text, #author").addClass("animate__animated animate__fadeIn");
    
    let index=alternate(data.length);
    
    let thisQuote=data[index]["quote"];
    $("#text").html(`<h3><i class="fa fa-quote-left"> </i> ${thisQuote}</h3>`);
    
    let thisAuthor=data[index]["author"];
    $("#author").html(`<p>- ${thisAuthor}</p>`);

    let twitter_link = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + thisQuote
    $("#tweet-quote").attr("href", twitter_link);

    let tumblr_link = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+ thisAuthor + "&content=" + thisQuote +"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    $("#tumblr-quote").attr("href", tumblr_link);
    
    return {thisAuthor, thisQuote};
};

$(document).ready(function(){
    $("#new-quote").on("click", fadeOut)
})