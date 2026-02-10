// Shared logic for all TravelGo Pages

document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulate Login State in Header
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink && localStorage.getItem('isLoggedIn')) {
        loginLink.innerHTML = '<i class="fas fa-user-circle" style="color: #008cff;"></i><span>Hi Arman!</span>';
        loginLink.href = "#";
        loginLink.style.cursor = "default";
    }

    // 2. Input Box Highlighting & Modal Logic
    const inputBoxes = document.querySelectorAll('.input-box');
    const modals = document.querySelectorAll('.traveller-modal, .suggestion-modal, .calendar-modal');

    inputBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Remove active from all boxes and hide all modals first
            inputBoxes.forEach(b => b.classList.remove('active'));
            modals.forEach(m => m.classList.remove('active'));

            box.classList.add('active');

            // Show specific modal based on box ID
            const modal = box.querySelector('.traveller-modal, .suggestion-modal, .calendar-modal');
            if (modal) modal.classList.add('active');

            e.stopPropagation();
        });
    });

    // Close modals when clicking outside
    document.addEventListener('click', () => {
        inputBoxes.forEach(b => b.classList.remove('active'));
        modals.forEach(m => m.classList.remove('active'));
    });

    // 2b. Suggestion Selection Logic
    const cityTags = document.querySelectorAll('.city-tag');
    cityTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const box = tag.closest('.input-box');
            const cityInput = box.querySelector('.input-value');
            const subText = box.querySelector('.input-sub');

            if (cityInput.tagName === 'INPUT') {
                cityInput.value = tag.dataset.city;
            } else {
                cityInput.textContent = tag.dataset.city;
            }
            subText.textContent = tag.dataset.sub;

            // Hide modal
            tag.closest('.suggestion-modal').classList.remove('active');
        });
    });

    // 2c. Calendar Selection Logic
    const dayItems = document.querySelectorAll('.day-item:not(.empty)');
    dayItems.forEach(day => {
        day.addEventListener('click', (e) => {
            e.stopPropagation();
            dayItems.forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');

            const dateNum = day.querySelector('.day-num').textContent;
            const depVal = document.getElementById('dep-val');
            if (depVal) depVal.textContent = (dateNum < 10 ? '0' : '') + dateNum + ' Feb 24';

            // Hide modal
            day.closest('.calendar-modal').classList.remove('active');
        });
    });

    // 2d. Traveller & Class Logic
    const selectorItems = document.querySelectorAll('.selector-item');
    selectorItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const group = item.parentElement;
            group.querySelectorAll('.selector-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const classItems = document.querySelectorAll('.class-item');
    classItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            classItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const applyBtn = document.getElementById('apply-travellers');
    if (applyBtn) {
        applyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const adults = document.querySelector('.selector-grid[data-type="adults"] .active').textContent;
            const children = document.querySelector('.selector-grid[data-type="children"] .active').textContent;
            const infants = document.querySelector('.selector-grid[data-type="infants"] .active').textContent;
            const travelClass = document.querySelector('.class-item.active').textContent;

            const total = parseInt(adults) + parseInt(children) + parseInt(infants);
            const travVal = document.getElementById('trav-val');
            const classVal = document.getElementById('class-val');

            if (travVal) travVal.textContent = total + (total > 1 ? ' Travellers' : ' Traveller');
            if (classVal) classVal.textContent = travelClass;

            document.getElementById('trav-modal').classList.remove('active');
            document.getElementById('traveller-box').classList.remove('active');
        });
    }

    // 2e. Swap Locations Logic
    const swapBtn = document.getElementById('swap-locations');
    if (swapBtn) {
        swapBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const fromCity = document.getElementById('from-city');
            const toCity = document.getElementById('to-city');
            const fromSub = document.getElementById('from-sub');
            const toSub = document.getElementById('to-sub');

            if (fromCity && toCity) {
                const tempVal = fromCity.value;
                fromCity.value = toCity.value;
                toCity.value = tempVal;
            }

            if (fromSub && toSub) {
                const tempSub = fromSub.textContent;
                fromSub.textContent = toSub.textContent;
                toSub.textContent = tempSub;
            }

            const icon = swapBtn.querySelector('i');
            icon.style.transition = 'transform 0.4s';
            icon.style.transform = (icon.style.transform === 'rotate(180deg)') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    }

    // 3. Search Button Feedback & Validation
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const fromCity = document.getElementById('from-city');
            const toCity = document.getElementById('to-city');
            const depDate = document.getElementById('dep-val');

            // Validation
            if (fromCity && fromCity.value.trim() === '') {
                alert('Please select a valid "From" city.');
                fromCity.focus();
                return;
            }
            if (toCity && toCity.value.trim() === '') {
                alert('Please select a valid "To" city.');
                toCity.focus();
                return;
            }
            if (depDate && depDate.textContent === '--') {
                alert('Please select a Departure Date.');
                return;
            }

            // Simulation
            const originalText = searchBtn.textContent;
            searchBtn.textContent = 'SEARCHING...';
            searchBtn.style.opacity = '0.7';
            searchBtn.disabled = true;

            setTimeout(() => {
                searchBtn.textContent = originalText;
                searchBtn.style.opacity = '1';
                searchBtn.disabled = false;

                // Simulate results
                const route = `${fromCity ? fromCity.value : 'Origin'} to ${toCity ? toCity.value : 'Destination'}`;
                alert(`Search Successful!\n\nListing 45 flights for ${route}.\nLowest price: ₹4,100`);
            }, 1500);
        });
    }

    // 4. Category Switcher Animation
    const catItems = document.querySelectorAll('.cat-item');
    catItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Only handle internal navigation logic if needed, 
            // but usually these are <a> tags that reload the page.
            // We just ensure the transition feels smooth.
        });
    });
});