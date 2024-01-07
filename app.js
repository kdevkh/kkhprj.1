document.addEventListener("DOMContentLoaded", function () {
    // 여기에 기존의 전역 코드를 넣으세요.

    // ------------- Card Making -------------
    // const defined
    const movieContainer = document.getElementById('Cards');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    // Fetching from here
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFjMDczZmM2NGZhZGE5YTMxNTU1MzlkNWYzMGViZCIsInN1YiI6IjY1OTc3Yzc4NTkwN2RlNTQ2ZTYzYzA3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UicVG0R1cpvWhApW9lCa5MASIhIm99FNmHtVGJ6mIjU'
        }
    };

    // Function to fetch configuration data
    function fetchConfiguration() {
        return fetch('https://api.themoviedb.org/3/configuration', options)
            .then(response => response.json())
            .then(data => data.images)
            .catch(error => {
                console.error('Error fetching configuration:', error);
                throw error;
            });
    }

    // Function to fetch top-rated movies data
    function fetchTopRatedMovies() {
        return fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => data.results)
            .catch(error => {
                console.error('Error fetching top-rated movies:', error);
                throw error;
            });
    }

    // Function to combine data and create URLs
    function combineDataAndCreateUrls() {
        return Promise.all([fetchConfiguration(), fetchTopRatedMovies()])
            .then(([cardImage, cardInfo]) => {
                const base = cardImage.secure_base_url;
                const posterSize = cardImage.poster_sizes[2];

                // Select the container with the ID 'Cards'
                let movieContainer = document.getElementById('Cards');

                if (!movieContainer) {
                    console.error('Element with ID "Cards" not found.');
                    return;
                }

                cardInfo.forEach(movie => {
                    let title = movie.title;
                    let rating = movie.vote_average;
                    let overview = movie.overview;
                    let release = movie.release_date;
                    let poster = movie.poster_path;


                    // Create URL using the combined data
                    let imageUrl = `${base}${posterSize}${poster}`;

                    // Create HTML for the movie card
                    let cardHTML = `
                    <div class="card">
                        <img src="${imageUrl}" alt="${title}" class="card-image">
                        <div class="card-details">
                            <h3 class="card-title">${title}</h3>
                            <p class="card-release">Release Date: ${release}</p>
                            <p class="card-rating">Rating: ${rating}</p>
                            <p class="card-overview">${overview}</p>
                        </div>
                    </div>
                `;

                    // Append the card HTML to the movie container
                    movieContainer.innerHTML += cardHTML;

                    // Add an event listener to each card for the click event
                    let alertCards = document.querySelectorAll('.card');
                    alertCards.forEach((card, index) => {
                        let currentMovie = cardInfo[index];
                        card.addEventListener('click', () => {
                            alert(`Movie ID : ${currentMovie.id}`);
                        });
                    });
                });
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }

    // Call the combined function
    combineDataAndCreateUrls();

    // ------------- Search Function -------------
    // 추가된 검색 함수
    function searchMovies() {
        // 사용자가 입력한 검색어 가져오기
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        if (!searchTerm) {
            alert('검색어를 입력하세요.');
            return;
        }

        // 모든 카드 숨기기
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.style.display = 'none';
        });

        // 검색어와 일치하는 카드만 표시
        const matchingCards = document.querySelectorAll('.card-title');
        matchingCards.forEach(cardTitle => {
            const title = cardTitle.textContent.toLowerCase();
            const card = cardTitle.closest('.card');

            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            }
        });

        // 검색 결과가 없을 경우 알림창 띄우기
        const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
        if (visibleCards.length === 0) {
            alert('검색어와 일치하는 검색 결과가 없습니다.');
        }
    }

    // 이벤트 리스너 추가
    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }

    // 검색 버튼 및 엔터 키 이벤트 리스너 추가
    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }

    if (searchInput) {
        // 검색 입력란에 포커스 설정하여 커서 위치시키기
        searchInput.focus();

        // 엔터 키 이벤트 감지
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                // 엔터 키를 누르면 검색 함수 호출
                searchMovies();
            }
        });
    }


// ------------- Sort Function -------------
    // 정렬 기준 선택 드롭다운 메뉴 추가
    const sortDropdown = document.createElement('div');
    sortDropdown.innerHTML = `
        <div class="btn-group">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                정렬 기준
            </button>
            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                <li><a class="dropdown-item" href="#" id="sortByRating">높은 Rating 순서</a></li>
                <li><a class="dropdown-item" href="#" id="sortByReleaseDate">최근 Release Date 순서</a></li>
                <li><a class="dropdown-item" href="#" id="sortByPopularity">높은 Popularity 순서</a></li>
            </ul>
        </div>
    `;
    document.body.insertBefore(sortDropdown, movieContainer);

    // 정렬 이벤트 리스너 추가
    const sortByRatingButton = document.getElementById('sortByRating');
    const sortByReleaseDateButton = document.getElementById('sortByReleaseDate');
    const sortByPopularityButton = document.getElementById('sortByPopularity');

    if (sortByRatingButton && sortByReleaseDateButton && sortByPopularityButton) {
        sortByRatingButton.addEventListener('click', () => {
            sortCardsBy('vote_average');
        });

        sortByReleaseDateButton.addEventListener('click', () => {
            sortCardsBy('release_date');
        });

        sortByPopularityButton.addEventListener('click', () => {
            sortCardsBy('popularity');
        });
    }

    // 기본적으로는 Rating 순으로 정렬
    sortCardsBy('vote_average');

    // 정렬 기능 함수
    function sortCardsBy(sortKey) {
        const allCards = document.querySelectorAll('.card');
        const sortedCards = Array.from(allCards).sort((a, b) => {
            const aValue = a.getAttribute(`data-${sortKey}`);
            const bValue = b.getAttribute(`data-${sortKey}`);

            if (sortKey === 'release_date') {
                return new Date(bValue) - new Date(aValue);
            } else {
                return bValue - aValue;
            }
        });

        movieContainer.innerHTML = '';
        sortedCards.forEach(card => {
            movieContainer.appendChild(card);
        });
    }
});

