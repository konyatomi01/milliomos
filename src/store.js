import { ref, watch } from 'vue'
import { Preferences } from '@capacitor/preferences'
import kerdesek from './assets/kerdesek.json'


const difficulty = ref(1)
const Question = ref({})
const voltFelezes = ref(false)
const voltKozonseg = ref(false)
const voltKerdesCsere = ref(false)

const voltJáték = ref(false)

function switchQuestion() {
    Question.value = randomQuestion(difficulty.value)
}

function startNewGame() {
    difficulty.value = 1
    voltJáték.value = true
    voltFelezes.value = false
    voltKozonseg.value = false
    voltKerdesCsere.value = false
    Question.value = randomQuestion(difficulty.value)
}

export const useStore = () => {

    return {
        Question,
        voltFelezes,
        voltKozonseg,
        voltKerdesCsere,
        randomQuestion,
        difficulty,
        voltJáték,
        load,
        switchQuestion,
        startNewGame
    }
}

export async function load() {
    await Promise.all([Preferences.get({ key: 'voltFelezes' }).then((res) => {
        voltFelezes.value = JSON.parse(res.value) ?? false
    }),
    Preferences.get({ key: 'voltKozonseg' }).then((res) => {
        voltKozonseg.value = JSON.parse(res.value) ?? false
    }),
    Preferences.get({ key: 'voltKerdesCsere' }).then((res) => {
        voltKerdesCsere.value = JSON.parse(res.value) ?? false
    }),
    Preferences.get({ key: 'question' }).then((res) => {
        let question = JSON.parse(res.value)
        if (question) {
            Question.value = question
            difficulty.value = Question.value.difficulty
            voltJáték.value = true
        } else {
            difficulty.value = 1
            Question.value =  randomQuestion(difficulty.value)
            voltJáték.value = false
        }
    })])
}

async function save() {
    let promises = [Preferences.set({
        key: 'voltFelezes',
        value: JSON.stringify(voltFelezes.value)
    }),
    Preferences.set({
        key: 'voltKozonseg',
        value: JSON.stringify(voltKozonseg.value)
    }),
    Preferences.set({
        key: 'voltKerdesCsere',
        value: JSON.stringify(voltKerdesCsere.value)
    }),
    Preferences.set({
        key: 'question',
        value: JSON.stringify(Question.value)
    })]
    await Promise.all(promises)
}

watch([voltFelezes, voltKozonseg, voltKerdesCsere, Question], async () => {
    await save()
})

function randomQuestion(difficulty) {
    const question = kerdesek.filter(q => q.difficulty == difficulty).random()
    let answers = [{
        id: 'A',
        text: question.answerA,
        displayed: true,
        percentage: undefined
    },
    {
        id: 'B',
        text: question.answerB,
        displayed: true,
        percentage: undefined
    },
    {
        id: 'C',
        text: question.answerC,
        displayed: true,
        percentage: undefined
    },
    {
        id: 'D',
        text: question.answerD,
        displayed: true,
        percentage: undefined
    }]

    let result = {
        ...question,
        answers
    }

    return result
}