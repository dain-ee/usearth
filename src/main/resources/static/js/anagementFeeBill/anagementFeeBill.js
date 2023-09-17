function toggleMore() {
    const firstHidden = document.getElementById('firstHiddenLine');
    const secondHidden = document.getElementById('secondHiddenLine');

    // 납부액 및 납부금 상세내역 표시 및 숨김 (토글)
    firstHidden.style.display = firstHidden.style.display === 'none' ? 'block' : 'none';
    // 상세내역부분 항상 숨기기
    secondHidden.style.display = 'none';
}

function toggleDetails() {
    const secondHidden = document.getElementById('secondHiddenLine');

    // 상세내역부분 표시 및 숨김
    secondHidden.style.display = secondHidden.style.display === 'none' ? 'block' : 'none';
}

// 글 상단으로 올리는 top 기능
window.onscroll = function() {
    showTopButton()
};

function showTopButton() {
    const buttonTop = document.getElementById('topButton');

    // 스크롤을 어느부분까지 내리면 자동으로 생성
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        buttonTop.style.display = "block";
    } else {
        buttonTop.style.display = "none";
    }
}

function scrollToTop() {
    // 맨 처음으로 스크롤을 올려줌
    window.scrollTo({top: 0, behavior: 'smooth'});
}


<!--전월비교 그래프-->
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawStuff);

    function drawStuff() {
    const data = new google.visualization.arrayToDataTable([
    ['통화', '만원'],
    ["5월", 27.5],
    ["6월", 16.9],
    ["7월", 29],
    ["8월", 30.7],
    ['9월', 0]
    ]);

    const  options = {
    width:500,
    // height: 200,
    legend: { position: 'none' },
    chart: {
    title: '힐스테이트 302동 2301호',
    subtitle: '전월비교' },
    axes: {
    x: {
    0: { side: 'top', label: '2023년'} // Top x-axis.
    }
},
    bar: { groupWidth: "20%" }
};

    const  chart = new google.charts.Bar(document.getElementById('top_x_div'));
    // Convert the Classic options to Material options.
    chart.draw(data, google.charts.Bar.convertOptions(options));


};


// function drawComparisonChart() {
//
//     // 숨겨놓았던 부분 오픈
//     const elementsToShow = document.querySelectorAll("#top_x_div, .graphMiddleLine, .buildingNumber, .graphMiddleLineStrong, .chargeAmountView, .compareMonthlyAmounts");
//     elementsToShow.forEach(element => {
//         element.style.display = "block";
//     });
// }

