document.addEventListener("DOMContentLoaded", () => {
    // searchInput이 HTML에서 정의되지 않아 이에 따른 js 실행에 에러가 있었음
    // 비동기적인 js 로딩이 문제(Race condition)였던 것으로 파악 >> HTML 파싱 후 js 실행 및 적용

    // ------------- 카드 생성 -------------
    // HTML에서 DOM element를 가져와 js에 상수로 할당
    const movieContainer = document.getElementById('Cards');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    // API 호출 방식(GET) 및 Authorization Key 발급 내역
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: myConfig.apiKey,
        }
    };

    // 비동기적으로 각 url 호출
    const fetchData = async (url) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json(); // 서버에서 받아온 JSON데이터 저장
            return data;
        } catch (error) {
            console.error(`Error : ${url}:`, error);
            throw error;
        }
    };

    // 영화 이미지 구성을 위한 configuration data
    const fetchConfiguration = async () => {
        const data = await fetchData('https://api.themoviedb.org/3/configuration');
        return data.images;
    };

    // 본 과제 main data --- 인기 영화 목록 추출 함수(top-rated movies data)
    const fetchTopRatedMovies = async () => {
        const data = await fetchData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        return data.results;
    };

    // Promise를 통해 비동기 작업을 동기적으로 두(2) API에서 호출된 데이터를 조합 후 URL 생성
    const combineDataAndCreateUrls = async () => {
        try {
            // 필요한 데이터를 비동기적으로 가져오기
            const [cardImage, cardInfo] = await Promise.all([fetchConfiguration(), fetchTopRatedMovies()]);

            // 이미지 URL 생성을 위한 기본 정보 const 설정
            const base = cardImage.secure_base_url;
            const posterSize = cardImage.poster_sizes[2];

            // 카드 컨테이너를 찾아서 확인
            if (!movieContainer) {
                console.error('카드 컨테이너 없음.');
                return;
            }

            // 필요한 카드 정보 호출 및 const 할당
            movieContainer.innerHTML = cardInfo.map(movie => {
                const { title, vote_average: rating, overview, release_date: release, poster_path: poster, id } = movie;
                const imageUrl = `${base}${posterSize}${poster}`;

                // 정의된 const를 바탕으로 HTML 카드 생성
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
            }).join(''); // 배열 연결용

            // 각 카드에 클릭 이벤트 리스너(id값 alert) 추가
            // 이벤트리스너가 모든 카드에 대해 동일한 alertId를 사용했어서 최종 값이 모두 같은 ID알림이었음. 클로저를 통해 각 이벤트리스너가 해당 카드의 정보를 정확히 기억하도록 수정함.
            document.querySelectorAll('.card').forEach((card, index) => {
                card.addEventListener('click', () => { // 이 안의 콜백함수가 클로저 역할을 함
                    alert(`Movie ID: ${cardInfo[index].id}`);
                });
            });
        } catch (error) {
            console.error('Error', error);
        }
    };

    // ------------- 검색 기능 -------------
    // 검색창에 검색어 소문자로 변환하여 가져옴 > const로 할당
    const searchMovies = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        // 입력 값이 없을 때
        if (!searchTerm) {
            alert('검색어를 입력하세요.');
            return;
        }

        // forEach로 검색어와 일치하는 카드만 표시
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase(); // 카드 제목도 소문자로 가져옴
            card.style.display = title.includes(searchTerm) ? 'block' : 'none';
        }); // 검색어 일치하면 block, 아니면 없애기(none)

        // 검색 결과가 없을 경우 알림창 띄움
        const visibleCards = document.querySelectorAll('.card');
        if (visibleCards.length === 0) {
            alert('검색어와 일치하는 검색 결과가 없습니다.');
        }
    };

    // 검색 버튼 클릭 이벤트 리스너 추가
    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }

    // 검색 입력란에 포커스 설정 및 엔터 키 이벤트 처리
    if (searchInput) {
        searchInput.focus(); // 자동 커서 위치

        searchInput.addEventListener('keydown', (event) => { // 엔터키 작동 적용
            if (event.key === 'Enter') {
                searchMovies();
            }
        });
    }

    // 초기 화면 로딩 시 영화 데이터 호출 및 카드 생성
    combineDataAndCreateUrls();
});
