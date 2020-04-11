const charts = document.getElementById('charts');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

//Animation collumn
svg.innerHTML = `<style>
.fadeIn {
    animation: fadeIn 2s;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 100%;
    }
}
</style>`;

//Config svg
const { width, height, viewBox } = {
    width: '729',
    height: '362',
    viewBox: '0 0 729 362',
}

svg.setAttribute('width', width);
svg.setAttribute('height', height);
svg.setAttribute('viewBox', viewBox);
svg.style.display = 'flex';
svg.style.margin = 'auto';
svg.style.boxShadow = ' 8px 29px 48px -16px rgba(0,0,0,0.13)';
svg.style.borderRadius = '15px';
svg.style.marginTop = '50px';

//**Data***//
const productStock = {
    CamisaSocial: 245,
    BermudaJeans: 127,
    Short: 89,
    CalcaJeans: 542,
    Mochila: 56,
    Bone: 358
}

const productSale = {
    CamisaSocial: 150,
    BermudaJeans: 64,
    Short: 46,
    CalcaJeans: 248,
    Mochila: 39,
    Bone: 92
}

//Data height collumn
let valueStock = Object.values(productStock);
let valueSale = Object.values(productSale);

function dataHeight(i) {
    let trendMonth = ~~((valueSale[i] * 100) / valueStock[i]);
    let heightCol = ~~((200 * trendMonth) / 100);

    return heightCol;
}

//Fonts
const head = document.head;
const robotoFont = '<link href="https://fonts.googleapis.com/css?family=Roboto:700&display=swap" rel="stylesheet">';
const robotoLightFont = '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">';
const archivoFont = '<link href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap" rel="stylesheet">'
head.innerHTML = robotoFont + robotoLightFont + archivoFont;

//Title 
const textTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textTitle.setAttribute('font-size', '20');
textTitle.setAttribute('font-family', 'Archivo Black');
textTitle.setAttribute('letter-spacing', '-0.056em');
textTitle.setAttribute('transform', 'translate(41 46)');
textTitle.innerHTML = 'Gráfico Vertical';

svg.appendChild(textTitle);

//Line background
const { x2, y2, fill, transform, stroke, strokeWidth } = {
    x2: '442',
    y2: '0.608',
    fill: 'none',
    transform: null,
    stroke: '#dfdfdf',
    strokeWidth: '0.5'
}

let ty = 95
for (let i = 0; i < 5; i++) {
    let tyResult = ((ty += 50) - 50)
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('fill', fill);
    line.setAttribute('transform', `translate(45 ${tyResult})`);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', strokeWidth);
    svg.appendChild(line);
}

//**Collumn**//

//Config Background
const { widthBKG, heightBKG, rx, transformBKG, fillImpar, fillPar } = {
    widthBKG: '30',
    heightBKG: '200',
    rx: '9',
    transform: null,
    fillImpar: '#eff2ff',
    fillPar: '#faefff',
}

let txBKG = 45;

//Config collumn
const { widthCOL, rxCOL, transformCOL, fillImparCOL, fillParCOL } = {
    widthCOL: '30',
    rxCOL: '9',
    transform: null,
    fillImparCOL: '#3a5bff',
    fillParCOL: '#c53aff',
}

//Config Text down
const { fillDown, fontSizeDown, transformDown, fontFamily, fontWeight, dataTextDown } = {
    fillDown: '#878787',
    fontSizeDown: 12,
    transform: null,
    fontFamily: 'Roboto',
    fontWeight: 500,
    dataTextDown: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
}

//tx start
let txDown = 50;

for (let i = 0; i < dataTextDown.length; i++) {
    let txResult = ((txBKG += 83) - 83);

    function fillValueBKG() {
        if (i % 2 === 0) {
            return fillImpar
        } else {
            return fillPar
        }
    }

    function fillValueCOL() {
        if (i % 2 === 0) {
            return fillImparCOL
        } else {
            return fillParCOL
        }
    }

    //Background Collumn
    const rectBKG = document.createElementNS('http://www.w3.org/2000/svg', 'rect');    
    rectBKG.setAttribute('width', widthBKG);
    rectBKG.setAttribute('height', heightBKG);
    rectBKG.setAttribute('rx', rx);
    rectBKG.setAttribute('transform', `translate(${txResult} 95)`);
    rectBKG.setAttribute('fill', fillValueBKG());
    svg.appendChild(rectBKG);

    //Collumn main    
    const rectCol = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectCol.classList.add('fadeIn');
    rectCol.setAttribute('width', widthCOL);
    rectCol.setAttribute('height', dataHeight(i));//Height varia de acordo com o dado
    rectCol.setAttribute('rx', rxCOL);
    rectCol.setAttribute('transform', `translate(${txResult} ${295 - dataHeight(i)})`);
    rectCol.setAttribute('fill', fillValueCOL());
    svg.appendChild(rectCol);

    //Houver box
    rectCol.addEventListener('mouseover', () => {
        textBox.innerHTML = `${Object.values(productSale)[i]} Vendas`;

        function percentageMoth() {
            let percentage = ~~((valueSale[i] * 100) / valueStock[i]);
            let percentageArrow = percentage + '%' + (percentage > 50 ? '🔼' : '🔽');
            return percentageArrow
        }

        rectBox.setAttribute('stroke', fillValueCOL());

        textBoxPercentage.innerHTML = `${percentageMoth()}`
        divSvg.setAttribute('transform', `translate(${txResult - 22} ${(295 - dataHeight(i) - 18)})`);
        divSvg.setAttribute('display', 'block');
    })

    rectCol.addEventListener('mouseout', () => {
        divSvg.setAttribute('display', 'none');
    })

    //Text down
    let txResultDown = ((txDown += 82.4) - 82.4);

    const textDown = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textDown.setAttribute('fill', fillDown);
    textDown.setAttribute('font-size', fontSizeDown);
    textDown.setAttribute('font-family', fontFamily);
    textDown.setAttribute('font-weight', fontWeight);
    textDown.setAttribute('transform', `translate(${txResultDown} 324)`);

    textDown.innerHTML = dataTextDown[i];

    svg.appendChild(textDown);
}

//Div svg
const divSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
const rectBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

//Config rect box
const { widthBox, heightBox, rxBox, fillBox } = {
    widthBox: 74,
    heightBox: 42,
    rxBox: 6,
    fillBox: '#ffffff'
};

rectBox.setAttribute('width', widthBox);
rectBox.setAttribute('height', heightBox);
rectBox.setAttribute('rx', rxBox);
rectBox.setAttribute('fill', fillBox);

divSvg.setAttribute('transform', 'translate(23 78)');
divSvg.setAttribute('display', 'none');

const textBox = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textBox.setAttribute('fill', fillImparCOL);
textBox.setAttribute('font-size', '11');
textBox.setAttribute('font-family', fontFamily);
textBox.setAttribute('font-weight', '700');
textBox.setAttribute('x', '9');
textBox.setAttribute('y', '15');

const textBoxPercentage = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textBoxPercentage.setAttribute('font-size', '14');
textBoxPercentage.setAttribute('font-family', 'Archivo Black');
textBoxPercentage.setAttribute('x', '9');
textBoxPercentage.setAttribute('y', '32');

divSvg.appendChild(rectBox);
divSvg.appendChild(textBox);
divSvg.appendChild(textBoxPercentage);

svg.appendChild(divSvg)

//Header nav
let navItem = ['Vendas', 'Ganhos', 'Saldos'];

//Rect nav
const rectNav = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rectNav.setAttribute('fill', fillImparCOL);
rectNav.setAttribute('width', '24');
rectNav.setAttribute('height', '3');
rectNav.setAttribute('rx', '3');
rectNav.setAttribute('transform', `translate(258 50)`);

svg.appendChild(rectNav);

//Button detail
const divSvgBtn = document.createElementNS('http://www.w3.org/2000/svg', 'g');

const { transformDivSvgBtn, fillDivSvgBtn, strokeDivSvgBtn, strokeWidthDivSvgBtn } = {
    transformDivSvgBtn: 'translate(628.625 53) rotate(-90)',
    fillDivSvgBtn: '#ffffff',
    strokeDivSvgBtn: '#3a5bff',
    strokeWidthDivSvgBtn: 0.5,
};

divSvgBtn.setAttribute('transform', transformDivSvgBtn);
divSvgBtn.setAttribute('fill', fillDivSvgBtn);
divSvgBtn.setAttribute('stroke', strokeDivSvgBtn);
divSvgBtn.setAttribute('stroke-width', strokeWidthDivSvgBtn);

//Rect button
const rectBtn = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

const { xBtn, yBtn, widthBtn, heightBtn, rxBtn, fillBtn } = {
    xBtn: 0.25,
    yBtn: 0.25,
    widthBtn: 21.5,
    heightBtn: 72,
    rxBtn: 3.75,
    fillBtn: 'none',
};

rectBtn.setAttribute('x', xBtn);
rectBtn.setAttribute('y', yBtn);
rectBtn.setAttribute('width', widthBtn);
rectBtn.setAttribute('height', heightBtn);
rectBtn.setAttribute('rx', rxBtn);
rectBtn.setAttribute('fill', fillBtn);

divSvgBtn.appendChild(rectBtn);

//Text button
const textBtn = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textBtn.innerHTML = 'Detalhes';

//Config text button 
const { transformTextBtn, fillTextBtn } = {
    transformTextBtn: 'translate(643 46)',
    fillTextBtn: '#3a5bff',
};

textBtn.setAttribute('transform', transformTextBtn);
textBtn.setAttribute('fill', fillTextBtn);
textBtn.setAttribute('font-family', fontFamily);
textBtn.setAttribute('font-size', fontSizeDown - 1);

svg.appendChild(textBtn);
svg.appendChild(divSvgBtn);

let txNav = 250;
let arrTxNav = []

for (let navNum = 0; navNum < navItem.length; navNum++) {
    const textNav = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const tspanNav = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

    tspanNav.innerHTML = navItem[navNum];
    textNav.appendChild(tspanNav);

    function textNavTranslate() {
        arrTxNav.push((txNav += 100) - 100);
    };
    textNavTranslate()
    textNav.setAttribute('transform', `translate(${arrTxNav[navNum]} 44)`);
    textNav.setAttribute('font-size', fontSizeDown);
    textNav.setAttribute('font-family', fontFamily);
    textNav.setAttribute('font-weight', fontWeight - 100);

    //Active rect
    textNav.addEventListener('click', () => {
        rectNav.setAttribute('transform', `translate(${arrTxNav[navNum] + 8} 50)`);
    });

    svg.appendChild(textNav);
}

/***Ranking***/

//Salespeople
let salespeople = ['José Augusto', 'Andressa Maia', 'Caio Eli', 'Andrielly Sasa'];

//Config divSvgRank
const { transformDivSvgRank, fillDivSvgRank, strokeDivSvgRank, strokeWidthDivSvgRank } = {
    transformDivSvgRank: null,
    fillDivSvgRank: '#ffffff',
    strokeDivSvgRank: '#eee',
    strokeWidthDivSvgRank: 1,
};

//Config rectRank
const { xRank, yRank, widthRank, heightRank, rxRank, fillRank } = {
    xRank: 0.5,
    yRank: 0.5,
    widthRank: 174,
    heightRank: 49,
    rxRank: 11.5,
    fillRank: 'none'
};

//Config nameRank
const { fillTextRank } = {
    xNameRank: '#878787',
};

//Config rectBoxNum
const { xBoxRank, yBoxRank, widthBoxRank, heightBoxRank, rxBoxRank, fillBoxRank } = {
    xBoxRank: 0.25,
    yBoxRank: 0.25,
    widthBoxRank: 13,
    heightBoxRank: 13,
    rxBoxRank: 2.75,
    fillBoxRank: '#eff2ff'
};

//Config icon
const { transformIcon, fillIcon, strokeIcon, strokeWidthIcon } = {
    transformIcon: 'translate(34 28) rotate(180)',
    fillIcon: 'none',
    strokeIcon: '#d2d2d2',
    strokeWidthIcon: 1.5
};

//Translate ty value start
let tyRank = 92;
let tyTextRank = 121;
let tyDivRankNum = 111;
let tyTextRankNum = 120.5;
let tyIconPerson = 96;

for (let rankNum = 0; rankNum < 4; rankNum++) {
    //Div Rank
    const divSvgRank = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    //Translate ty value
    let tyRankValue = () => {
        return ((tyRank += 62) - 62);
    }

    divSvgRank.setAttribute('transform', `translate(528 ${tyRankValue()})`);
    divSvgRank.setAttribute('fill', fillDivSvgRank);
    divSvgRank.setAttribute('stroke', strokeDivSvgRank);
    divSvgRank.setAttribute('stroke-width', strokeWidthDivSvgRank);

    //Rect Rank
    const rectRank = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectRank.setAttribute('x', xRank);
    rectRank.setAttribute('y', yRank);
    rectRank.setAttribute('width', widthRank);
    rectRank.setAttribute('height', heightRank);
    rectRank.setAttribute('rx', rxRank);
    rectRank.setAttribute('fill', fillRank);

    divSvgRank.appendChild(rectRank);
    svg.appendChild(divSvgRank);

    //Ranking number
    const divSvgRankNum = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    divSvgRankNum.setAttribute('fill', fillImpar)
    divSvgRankNum.setAttribute('stroke', strokeDivSvgBtn);
    divSvgRankNum.setAttribute('stroke-width', strokeWidth);

    //Translate ty value divSvgRankNum
    let tyDivRankValue = () => {
        return ((tyDivRankNum += 62) - 62);
    }

    divSvgRankNum.setAttribute('transform', `translate(542 ${tyDivRankValue()})`);

    const rectBoxNum = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectBoxNum.setAttribute('x', xBoxRank);
    rectBoxNum.setAttribute('y', yBoxRank);
    rectBoxNum.setAttribute('width', widthBoxRank);
    rectBoxNum.setAttribute('height', heightBoxRank);
    rectBoxNum.setAttribute('rx', rxBoxRank);
    rectBoxNum.setAttribute('fill', fillBoxRank);

    divSvgRankNum.appendChild(rectBoxNum);
    svg.appendChild(divSvgRankNum);

    //Number
    const textNum = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textNum.setAttribute('font-family', fontFamily);
    textNum.setAttribute('font-size', fontSizeDown - 4);
    textNum.setAttribute('fill', fillImparCOL);
    textNum.setAttribute('font-weight', 700);
    textNum.setAttribute('letter-spancing', '-0.104em');

    //Translate ty value number
    let tyTextNumValue = () => {
        return ((tyTextRankNum += 62) - 62);
    }

    textNum.setAttribute('transform', `translate(545.3 ${tyTextNumValue()})`);

    const tspanNum = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspanNum.setAttribute('x', 0);
    tspanNum.setAttribute('y', 0);
    textNum.innerHTML = rankNum + 1 + '°';

    textNum.appendChild(tspanNum);
    svg.appendChild(textNum);

    //Name ranking
    const textRank = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textRank.setAttribute('font-family', fontFamily);
    textRank.setAttribute('font-size', fontSizeDown);
    textRank.setAttribute('fill', fillTextRank);
    textRank.setAttribute('font-weight', fontWeight - 100);

    function tyRankTextValue() {
        return (tyTextRank += 62) - 62;
    }

    textRank.setAttribute('transform', `translate(596 ${tyRankTextValue()})`);

    const nameRank = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    nameRank.innerHTML = salespeople[rankNum];

    textRank.appendChild(nameRank);
    svg.appendChild(textRank);

    //Icon person - header
    const divSvgIconPrime = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const divSvgCircleHeader = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    divSvgCircleHeader.setAttribute('transform', transformIcon);
    divSvgCircleHeader.setAttribute('fill', fillIcon);
    divSvgCircleHeader.setAttribute('stroke', strokeIcon);
    divSvgCircleHeader.setAttribute('stroke-width', strokeWidthIcon);

    const circleIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const { cxIcon, cyIcon, radioIcon } = {
        cxIcon: 11,
        cyIcon: 11,
        radioIcon: 4,
    }

    circleIcon.setAttribute('cx', cxIcon);
    circleIcon.setAttribute('cy', cyIcon);
    circleIcon.setAttribute('r', radioIcon);
    circleIcon.setAttribute('fill', fillIcon);

    divSvgIconPrime.appendChild(divSvgCircleHeader);
    divSvgCircleHeader.appendChild(circleIcon);

    const divSvgCircleBody = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    divSvgCircleBody.setAttribute('transform', 'translate(45 50) rotate(180)');
    divSvgCircleBody.setAttribute('fill', fillIcon);
    divSvgCircleBody.setAttribute('stroke', strokeIcon);
    divSvgCircleBody.setAttribute('stroke-width', strokeWidthIcon);

    //Icon person - body
    const ellipseIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ellipseIcon.setAttribute('cx', cxIcon + 11.5);
    ellipseIcon.setAttribute('cy', cyIcon + 8);
    ellipseIcon.setAttribute('r', radioIcon + 2.5);
    ellipseIcon.setAttribute('fill', fillIcon);

    const rectIcon = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectIcon.setAttribute('fill', '#ffffff');
    rectIcon.setAttribute('width', '40');
    rectIcon.setAttribute('height', '10');
    rectIcon.setAttribute('transform', 'translate(42 40) rotate(180)');

    divSvgCircleBody.appendChild(ellipseIcon);
    divSvgIconPrime.appendChild(divSvgCircleBody);
    divSvgIconPrime.appendChild(rectIcon);

    function tyIconPersonValue() {
        return (tyIconPerson += 62) - 62;
    }

    divSvgIconPrime.setAttribute('transform', `translate(553 ${tyIconPersonValue()})`);
    svg.appendChild(divSvgIconPrime);
}

charts.appendChild(svg);