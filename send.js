
function sendJson(){

    function sendPostRequest(url, data, callback) {
        // XMLHttpRequest 객체 생성
        var xhr = new XMLHttpRequest();
        
        // 요청을 초기화
        xhr.open('POST', url, true);
        
        // 요청 헤더 설정
        xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
        xhr.setRequestHeader( 'Accept', 'text/html, */*; q=0.01' );
        
        // 요청 상태 변경에 대한 이벤트 핸들러 정의
        xhr.onreadystatechange = function() {
            // 요청 완료(4) 및 성공(200) 검사
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 콜백 함수 호출 및 응답 데이터 전달
                callback(xhr.responseText);
            }
        };
        
        // 요청 데잍 ㅓ전송
        var encodedData = Object.keys(data).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        
        // 변환된 데이터와 함께 요청 전송
        xhr.send(encodedData);
    }
    
    
    // 인터파크 상품 정보 데이터 호출
    function handleResponse(response) {
        var elements = document.querySelectorAll('.sportsDetailContent .timeScheduleList');

        var element = elements[0];
        element.innerHTML = ''; // 내용 지우기
        element.innerHTML = response; // 새로운 데이터 추가

        // 5번째 상품 정보 조회
        var product = document.querySelector('.sportsDetailContent .timeScheduleList').children[4];
        var anc = product.querySelector('.btns a');
        // 버튼 활성화 시 클릭
        if( anc && anc.getAttribute('onclick') ){
            anc.click();
        }else{
            // 없으면 예매전 내용 출력
            console.log( "현재 예매전...");
        }
    }
    
    

    // 사용 인터파크 상품목록 호출 정보 정의
    var url = 'https://ticket.interpark.com/Contents/Sports/GoodsInfoList';
    var data = {
        SportsCode: '07001', // 야구 코드값
        TeamCode: 'PB004', // 두산베어스 팀코드값
        Page: '0',
        PageSize: '6',
    };
    
    // 인터파크 상품목록 호출
    sendPostRequest(url, data, handleResponse);
}

