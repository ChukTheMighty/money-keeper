'use strict'

    let startCalc = document.getElementById('start'),

        expensesBtn = document.getElementsByTagName('button')[0],
        optionalExpensesBrt = document.getElementsByTagName('button')[1],
        countBtn = document.getElementsByTagName('button')[2],
        budgetValue = document.getElementsByClassName('budget-value')[0],
        daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
        levelValue = document.getElementsByClassName('level-value')[0],
        expensesValue = document.getElementsByClassName('expenses-value')[0],
        optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
        incomeValue = document.getElementsByClassName('income-value')[0],
        monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
        yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
        expensesItems = document.getElementsByClassName('expenses-item'),

        optionalExpen = document.querySelectorAll('.optionalexpenses-item'),
        chooseIncome = document.querySelector('.choose-income'),
        savingsCheckBox = document.querySelector('#savings'),
        choosePercent = document.querySelector('.choose-percent'),
        chooseSum = document.querySelector('.choose-sum'),
        yearValue = document.querySelector('.year-value'),
        monthValue = document.querySelector('.month-value'),
        dayValue = document.querySelector('.day-value');

    let money, time;

    startCalc.addEventListener('click', function(){
        money = +prompt('Ваш бюджет на месяц?');
        time = prompt('Введите дату в формате YYYY-MM-DD');
        while(isNaN(money) || money == null || money == "") {
            money = prompt('Ваш бюджет на месяц?');
        };
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = appData.budget.toFixed(1);
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });

    expensesBtn.addEventListener('click', function(){
        if(appData.budget >0){
            let sum = 0;
            for(let i=0;i<expensesItems.length;i++){
                let a = expensesItems[i].value;
                let b = expensesItems[++i].value;
                if( (typeof(a) ) === 'string' && (typeof(a)) != null && ( typeof(b) ) != null && a != "" && b != "") {
                    console.log('Все верно');
                    appData.expenses[a] = b;
                    sum += +b;
                }   else {
                        i = i-1;
                    }
            }
            expensesValue.textContent = sum;
        }
    });
    countBtn.addEventListener('click', function(){
        if(appData.budget >0){
            appData.budgetPerDay = (appData.budget - expensesItems[1].value - expensesItems[3].value)/30;
            daybudgetValue.textContent = appData.budgetPerDay.toFixed(1);
            if(appData.budgetPerDay < 500){
                levelValue.textContent = 'минимальный уровень достатка';
            }   else if(appData.budgetPerDay >= 500 && appData.budgetPerDay < 2000){
                levelValue.textContent = 'средний уровень достатка';
            }   else if(appData.budgetPerDay >= 2000){
                levelValue.textContent = 'высокий уровень достатка';
            }
        }
    });

    savingsCheckBox.addEventListener('click', function(){
        if (appData.savings == true){
            appData.savings = false;
        } else {appData.savings = true}
    });

    chooseSum.addEventListener('input', function(){
        if (appData.savings == true){
            let sum = +chooseSum.value,
            percent = +choosePercent.value;
            appData.monthIncome = sum/100/12*percent; 
            appData.yearIncome = sum/100*percent; 
            monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(2); 
        }
    });

    choosePercent.addEventListener('input', function(){
        if (appData.savings == true){
            let sum = +chooseSum.value,
            percent = +choosePercent.value;
            appData.monthIncome = sum/100/12*percent; 
            appData.yearIncome = sum/100*percent; 
            monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
            
        }
    });

    optionalExpensesBrt.addEventListener("click", function(){
        if(appData.budget >0){
            for (let i=0; i<optionalExpen.length; i++){
                let opt = optionalExpen[i].value;
                appData.optionalExpenses[i] = opt;
                optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            }
        }
    });

    chooseIncome.addEventListener('change', function(){
        let items = chooseIncome.value;
        appData.income = items.split(', ');
        incomeValue.textContent =  appData.income;
    });

    let appData = {
        budget: money, 
        timeData: time,
        income: [],
        savings: false,
        expenses: {},
        optionalExpenses: {}
    };