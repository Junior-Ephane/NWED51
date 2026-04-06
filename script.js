
    var API_URL = 'https://69d01d3490cd06523d5d0a63.mockapi.io/api/v1/businesses';
    var container = document.getElementById('card-container');
    var modal = document.getElementById("businessModal");
    var closeBtn = document.querySelector(".close-btn");
    var slideIndex = 1;

    async function loadBusinesses() {
        try {
            var response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            
            var businesses = await response.json();
            container.innerHTML = '';

            for (var i = 0; i < businesses.length; i++) {
                var business = businesses[i];
                var card = document.createElement('div');
                card.className = 'col-3 business-card';
                
                card.innerHTML = 
                    '<img src="' + business.imageUrl + '" alt="' + business.businessName + '" style="width:100%;">' +
                    '<h4>' + business.businessName + '</h4>' +
                    '<p><strong>Service:</strong> ' + business.serviceType + '</p>' +
                    '<p class="price">R ' + business.rate + '</p>';
                
                card.onclick = (function(b) {
                    return function() { openModal(b); };
                })(business);

                container.appendChild(card);
            }
        } catch (error) {
            console.log("Error: " + error);
            container.innerHTML = '<p style="color: red; padding: 20px;">Sorry, failed to load services.</p>';
        }
    }

    function openModal(business) {
        document.getElementById("modalTitle").innerText = business.businessName;
        document.getElementById("modalService").innerHTML = "<strong>Specialty:</strong> " + business.serviceType;
        document.getElementById("modalRate").innerHTML = "<strong>Pricing:</strong> R " + business.rate; 
        document.getElementById("modalContact").innerHTML = "<strong>Call/WhatsApp:</strong> " + business.contact;

        document.getElementById("slideshowWrapper").innerHTML = 
            '<div class="mySlides">' +
                '<img src="' + business.imageUrl + '" style="width:100%">' +
            '</div>';

        modal.style.display = "block";
        slideIndex = 1;
        showSlides(slideIndex);
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    function changeSlide(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        if (slides.length > 0) {
            slides[slideIndex - 1].style.display = "block";
        }
    }

    loadBusinesses();