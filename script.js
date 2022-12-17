
const main_video = document.getElementById('main-bg-video')
let btn_main_video = document.getElementById('btn-main-bg-video')

document.body.addEventListener('keyup', (e) => {
    if(e.isComposing || e.key == " " || e.code == "Space") 
        toggle_main_bg_video()
})

main_video.addEventListener('click', (e) => {
    toggle_main_bg_video()
    document.getElementById('menu').classList.remove("animation")
    document.getElementById('menu').classList.add("no-animation")
    setTimeout(() => {
        console.log(document.querySelector('.menu'))
        document.querySelector('.menu').style.pointerEvents = "auto";
    }, 520)
})

btn_main_video.addEventListener('click', (e) => checkVideoStatus())

function createImg(src){
    let img = document.createElement('img')
    img.src = src
    img.alt = ''
    return img
}

document.querySelectorAll('button').forEach(item => item.onfocus = () => item.blur())

function toggle_main_bg_video(){
    btn_main_video.querySelector('img').remove()
    btn_main_video.classList.toggle('play')

    if(main_video.paused){
        main_video.play()
        btn_main_video.appendChild(createImg('img/pause.png'))
        let timeline = document.getElementById('timeline')
        setInterval(() => {
            timeline.style.height = (((main_video.currentTime / main_video.duration) * 100) % 101).toString() + "%"
        }, 50)
    }else{
        main_video.pause()
        btn_main_video.appendChild(createImg('img/play.png'))
    }

    return main_video.paused
}

function checkVideoStatus(){
    if(!toggle_main_bg_video()){
        document.getElementById('menu').classList.remove("animation")
        document.getElementById('menu').classList.add("no-animation")
        setTimeout(() => {
            console.log(document.querySelector('.menu'))
            document.querySelector('.menu').style.pointerEvents = "auto";
        }, 520)
    }
}

function setAnimation(item){
    item.classList.remove("no-animation")
    item.classList.add("animation")
}


function enter_page(id){
    let section = document.getElementById(id)
    document.getElementById('menu').style.left = '100%'
    section.style.maxWidth = '100%'
    setTimeout(() => {
        section.querySelector('.main_section').classList.add('in-page')
        section.querySelector('.main_section').classList.remove('out-page')
        main_video.playbackRate = 0.6;
    }, 1500)
    
    document.getElementById('menu').classList.add("block")
}

function exit_page(id){
    let section = document.getElementById(id)
    section.querySelector('.main_section').classList.add('out-page')
    section.querySelector('.main_section').classList.remove('in-page')
    setTimeout(() => {
        section.style.maxWidth = '0'
        document.getElementById('menu').style.left = '0'
        main_video.playbackRate = 1;
        setTimeout(() => {
            reset_build()
        }, 1000)
    }, 1000)

    document.getElementById('menu').classList.remove("block")
}



// Card Builder
var changes = false

const titles = {
    'color': 'let\'s start with the color of suits.',
    'RED': 'Which one?.',
    'BLACK': 'Which one?',
    'kind': 'Now please choose the type of card.',
    'value': '...at last the value:',
    'submit': 'The card you guys built: ',
    'new_card':''
}

var card = {
    'suit': '',
    'value': ''
}

const choice_option = document.getElementById('choice__option')
const choice__title = document.getElementById('choice__title')

const value = [
    ['A', 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    ['Jack', 'Queen', 'King']
]

function build(id){
    const title = document.getElementById('choice__title')
    title.innerHTML = titles[id]
    if(id == 'submit') title.innerHTML += (card.value + ' of ' + card.suit + '.')
    const op = document.querySelectorAll('.choice__option')
    op.forEach(item => {
        item.style.display = 'none'
    })
    const color = document.getElementById(id)
    color.style.display = 'flex'
}

document.querySelectorAll('#RED > .option, #BLACK > .option').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent
        card.suit = text.substring(0, text.length-2).toLowerCase()
        if(changes) {build('submit')}
        else {build('kind')}
    })
})

const kind = document.querySelectorAll('#kind > .option')
for(let i=0; i<kind.length;i++){
    kind[i].addEventListener('click', ()=>{
        build('value')
        SetValue(i)
    })  
}

function SetValue(index){
    var val = document.getElementById('value')
    val.replaceChildren()
    value[index].forEach(item => {
        var op = document.createElement('div')
        op.classList.add('option')
        op.innerHTML = item
        val.appendChild(op)
    })
    Value(val)
}

function Value(parent){
    parent.querySelectorAll('.option').forEach(item => {
        item.addEventListener('click', () => {
            const s = item.textContent.toLowerCase()
            card.value = s == 'a' ? 'ace' : s
            build('submit')
        })
    })
}

function choose_suit(){
    changes = true
    build('color')
}

function show_final_card(){
    const img = document.getElementById('result')
    const tmp = (card.value == 'king' || card.value == 'jack' || card.value == 'queen') ? '2' : '';
    var url = './img/PNG-cards/' + card.value + '_of_' + card.suit + tmp + '.png'
    img.src = url
    build('new_card')
}

function reset_build(){
    build('color')
    changes = false
    document.getElementById('result').src = './img/PNG-cards/back.jpg'
}

window.onload = () => {
    main_video.defaultPlaybackRate = 1
    main_video.load()
    toggle_main_bg_video()
    reset_build()
}
