document.addEventListener("DOMContentLoaded", () => {

    // ------------- 카드 생성 -------------
    const movieContainer = document.getElementById('Cards');
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: myConfig.apiKey,
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error : ${url}:`, error);
            throw error;
        }
    };

    const fetchConfiguration = async () => {
        const data = await fetchData('https://api.themoviedb.org/3/configuration');
        return data.images;
    };

    const fetchTopRatedMovies = async () => {
        const data = await fetchData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        return data.results;
    };

    const generateMovieCards = async () => {
        try {
            const [cardImage, cardInfo] = await Promise.all([fetchConfiguration(), fetchTopRatedMovies()]);

            const base = cardImage.secure_base_url;
            const posterSize = cardImage.poster_sizes[2];

            if (!movieContainer) {
                console.error('카드 컨테이너 없음.');
                return;
            }

            movieContainer.innerHTML = cardInfo.map(movie => {
                const { title, vote_average: rating, overview, release_date: release, poster_path: poster, id } = movie;
                const imageUrl = `${base}${posterSize}${poster}`;

                return `
                    <div class="card">
                        <img src="${imageUrl}" alt="${title}" class="card-image">
                        <div class="card-details">
                            <h3 class="card-title">${title}</h3>
                            <p class="card-release">Release Date: ${release}</p>
                            <p class="card-rating">Rating: ${rating}</p>
                            <p class="card-overview">${overview}</p>
                        </div>
                    </div>`;
            }).join('');

            document.querySelectorAll('.card').forEach((card, index) => {
                card.addEventListener('click', () => {
                    alert(`Movie ID: ${cardInfo[index].id}`);
                });
            });
        } catch (error) {
            console.error('Error', error);
        }
    };

    // ------------- 검색 기능 -------------
    const searchMovies = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        if (!searchTerm) {
            alert('검색어를 입력하세요.');
            return;
        }

        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            if (!title.includes(searchTerm)) {
                card.remove(); // 피드백 반영: 불일치 결과 제거
            }
        });

        const visibleCards = document.querySelectorAll('.card');
        if (visibleCards.length === 0) {
            alert('검색어와 일치하는 검색 결과가 없습니다.');
        }
    };

    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }

    if (searchInput) {
        searchInput.focus();

        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchMovies();
            }
        });
    }

    generateMovieCards(); // 피드백 반영: 함수명 변경
});
