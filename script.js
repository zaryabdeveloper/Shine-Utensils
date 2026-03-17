
$(function () {

    // ── Navbar scroll ──
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // ── Active nav link ──
    $(window).on('scroll', function () {
        const scrollPos = $(this).scrollTop() + 100;
        $('section').each(function () {
            const top = $(this).offset().top;
            const bot = top + $(this).outerHeight();
            const id = $(this).attr('id');
            if (scrollPos >= top && scrollPos < bot) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${id}"]`).addClass('active');
            }
        });
    });

    // ── Scroll reveal ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Highlight today's discount ──
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    $('#discountGrid .discount-day-card').each(function () {
        const d = $(this).find('.day-name').text().trim();
        if (d === today) {
            $(this).addClass('today');
            $(this).prepend('<span class="today-tag">TODAY</span>');
        }
    });

    // ── Product filter tabs ──
    $('.product-filter-tabs .btn').on('click', function () {
        $('.product-filter-tabs .btn').removeClass('active');
        $(this).addClass('active');
        const filter = $(this).data('filter');
        if (filter === 'all') {
            $('.product-item').fadeIn(300);
        } else {
            $('.product-item').each(function () {
                if ($(this).data('cat') === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(200);
                }
            });
        }
    });

    // ── Product data ──
    const products = {
        kadhai: {
            name: 'Deep Kadhai Set', tier: 'Gold', material: '18/10 Stainless Steel',
            price: '₹1,299', warranty: '5 Years', induction: '✔ Yes', dishwasher: '✔ Yes',
            heat: 'Excellent (±2°C)', rating: '4.9/5', coating: 'Mirror / Non-Stick'
        },
        handi: {
            name: 'Copper Handi', tier: 'Premium', material: '99.9% Pure Copper',
            price: '₹2,899', warranty: 'Lifetime', induction: '✘ No', dishwasher: '✘ Hand Wash',
            heat: 'Superior (±1°C)', rating: '5.0/5', coating: 'Tin-Lined Interior'
        },
        cutlery: {
            name: 'Cutlery Set 24pc', tier: 'Silver', material: '16/8 Stainless Steel',
            price: '₹2,199', warranty: '2 Years', induction: '—', dishwasher: '✔ Yes',
            heat: 'N/A', rating: '4.5/5', coating: 'Mirror Polish'
        },
        tawa: {
            name: 'Non-Stick Tawa', tier: 'Gold', material: 'Aluminium (3-Layer NS)',
            price: '₹649', warranty: '2 Years', induction: '✔ Yes', dishwasher: '✔ Yes',
            heat: 'Good (±4°C)', rating: '4.4/5', coating: '3-Layer Non-Stick'
        },
        knife: {
            name: "Chef's Knife Set", tier: 'Premium', material: 'German X50CrMoV15 Steel',
            price: '₹4,299', warranty: 'Lifetime', induction: '—', dishwasher: '✘ Hand Wash',
            heat: 'N/A', rating: '5.0/5', coating: 'Satin / Polished Edge'
        },
        canister: {
            name: 'Canister Set 5pc', tier: 'Gold', material: '18/8 Stainless Steel',
            price: '₹1,799', warranty: '5 Years', induction: '—', dishwasher: '✔ Yes',
            heat: 'N/A', rating: '4.8/5', coating: 'Brushed Satin'
        }
    };

    const attrs = [
        ['Tier / Range', p => p.tier],
        ['Material', p => p.material],
        ['Price', p => p.price],
        ['Warranty', p => p.warranty],
        ['Induction', p => p.induction],
        ['Dishwasher Safe', p => p.dishwasher],
        ['Heat Distribution', p => p.heat],
        ['Surface Coating', p => p.coating],
        ['Customer Rating', p => p.rating],
    ];

    function buildCompare() {
        const a = products[$('#compareA').val()];
        const b = products[$('#compareB').val()];
        $('#thA').text(a.name);
        $('#thB').text(b.name);
        let rows = '';
        attrs.forEach(([label, fn]) => {
            const va = fn(a), vb = fn(b);
            rows += `<tr>
        <td class="compare-attr">${label}</td>
        <td class="${va !== vb ? 'neutral-cell' : ''}">${va}</td>
        <td class="${va !== vb ? 'neutral-cell' : ''}">${vb}</td>
      </tr>`;
        });
        $('#compareBody').html(rows);
    }

    buildCompare();
    $('#compareBtn').on('click', function () {
        if ($('#compareA').val() === $('#compareB').val()) {
            alert('Please select two different products to compare.');
            return;
        }
        buildCompare();
        $('html,body').animate({ scrollTop: $('#compareResult').offset().top - 120 }, 400);
    });

    // ── Star Rating ──
    let selectedStars = 0;
    $('.star-btn').on('click', function () {
        selectedStars = parseInt($(this).data('star'));
        $('.star-btn').each(function () {
            if (parseInt($(this).data('star')) <= selectedStars) {
                $(this).addClass('lit');
            } else {
                $(this).removeClass('lit');
            }
        });
    });
    $('.star-btn').on('mouseenter', function () {
        const hovered = parseInt($(this).data('star'));
        $('.star-btn').each(function () {
            if (parseInt($(this).data('star')) <= hovered) {
                $(this).css('color', 'var(--gold)');
            } else {
                $(this).css('color', $(this).hasClass('lit') ? 'var(--gold)' : '#DDD');
            }
        });
    });
    $('#starRating').on('mouseleave', function () {
        $('.star-btn').each(function () {
            $(this).css('color', $(this).hasClass('lit') ? 'var(--gold)' : '#DDD');
        });
    });

    // ── Submit Feedback ──
    $('#submitFeedback').on('click', function () {
        const name = $('#fbName').val().trim();
        const cat = $('#fbCategory').val();
        const text = $('#fbText').val().trim();
        if (!name || !cat || !text || selectedStars === 0) {
            alert('Please complete all fields and select a star rating.');
            return;
        }
        const stars = '★'.repeat(selectedStars) + '☆'.repeat(5 - selectedStars);
        const card = `
      <div class="feedback-card" style="display:none;border-color:rgba(201,168,76,0.4);">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <div class="fb-author">${$('<div>').text(name).html()}</div>
          <span class="fb-tag">${$('<div>').text(cat).html()}</span>
        </div>
        <div class="fb-stars">${stars}</div>
        <p class="fb-text">${$('<div>').text(text).html()}</p>
      </div>`;
        $('#reviewsContainer').prepend(card);
        $('#reviewsContainer .feedback-card:first').slideDown(400);
        $('#fbName').val('');
        $('#fbCategory').val('');
        $('#fbText').val('');
        selectedStars = 0;
        $('.star-btn').removeClass('lit').css('color', '#DDD');
    });

    // ── Contact Form ──
    $('#sendContactMsg').on('click', function () {
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        if (!name || !email) {
            alert('Please enter your name and email.');
            return;
        }
        $('#contactSuccess').fadeIn(300);
        setTimeout(() => $('#contactSuccess').fadeOut(400), 4000);
    });

    // ── Add to Cart toast ──
    $('body').append('<div id="cartToast" style="position:fixed;bottom:2rem;right:2rem;z-index:9999;background:var(--charcoal);color:white;padding:0.9rem 1.5rem;border-radius:14px;font-size:0.9rem;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,0.25);display:none;border-left:4px solid var(--gold);">🛒 Added to cart!</div>');
    $(document).on('click', '.btn-add-cart', function () {
        const name = $(this).closest('.product-body').find('.product-name').text();
        $('#cartToast').text(`🛒 "${name}" added to cart!`).stop(true).fadeIn(300);
        setTimeout(() => $('#cartToast').fadeOut(400), 2500);
    });

    // ── Smooth scroll for nav links ──
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html,body').animate({ scrollTop: target.offset().top - 70 }, 600);
            $('.navbar-collapse').collapse('hide');
        }
    });

});

function abc (){
    
    var a = document.getElementById("contact-name").value;
    var b = document.getElementById("contact-Email").value;
    var c = document.getElementById("phone-number").value;
    
    if(a==""||b==""||c=="")
    {
        alert("")
    }
}




/* ✅ Form Validation */
// form.addEventListener("submit", function(e) {
//     e.preventDefault();

//     let isValid = true;

//     // Reset errors
//     document.querySelectorAll(".error").forEach(el => el.textContent = "");
//     document.querySelectorAll(".form-ctrl").forEach(el => el.classList.remove("error-border"));

//     // Rating
//     if (!ratingInput.value) {
//         ratingError.textContent = "Please select a rating.";
//         isValid = false;
//     }

//     // Name
//     if (nameInput.value.trim() === "") {
//         nameError.textContent = "Name is required.";
//         nameInput.classList.add("error-border");
//         isValid = false;
//     }

//     // Category
//     if (categoryInput.value === "") {
//         categoryError.textContent = "Please select a category.";
//         categoryInput.classList.add("error-border");
//         isValid = false;
//     }

//     // Message
//     if (messageInput.value.trim().length < 10) {
//         messageError.textContent = "Message must be at least 10 characters.";
//         messageInput.classList.add("error-border");
//         isValid = false;
//     }

//     if (isValid) {
//         alert("Thank you! Your feedback has been submitted.");

//         form.reset();
//         ratingInput.value = "";
//         stars.forEach(s => s.classList.remove("active"));
//     }
// })


document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const stars = document.querySelectorAll(".star-btn");
    const ratingInput = document.getElementById("fbRating");

    // ⭐ Star Rating Selection
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let value = this.getAttribute("data-star");
            ratingInput.value = value;

            stars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add("active");
            }

            document.getElementById("ratingError").textContent = "";
        });
    });

    // 📝 Form Submit Validation
  

})
