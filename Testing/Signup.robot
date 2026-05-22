*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${browser}      Edge
${url}          http://localhost:3000/
${FULLNAME}     ayoubbnoune
${EMAIL}        ayoub123@gmail.com
${PASSWORD}     1234pDDHHD

*** Test Cases ***
Signup With Valid Data
    LunchBrowser
    Signup
    Verify Redirect To Login

*** Keywords ***
LunchBrowser
    Open Browser    ${url}    ${browser}
    Maximize Browser Window
    Sleep    6s

Signup
    Click Element    //*[@id="app"]/body/div/div/header/div[2]/div/a[2]/span
    Sleep    2s
    Click Element    //*[@id="app"]/div/main/div[2]/div/div[2]/button[2]
    Sleep    2s
    Input Text    //*[@id="app"]/div/main/div[2]/div/form/div[1]/div/input    ${FULLNAME}
    Sleep    2s
    Input Text    //*[@id="app"]/div/main/div[2]/div/form/div[3]/div/input    ${EMAIL}
    Sleep    2s
    Input Text    //*[@id="app"]/div/main/div[2]/div/form/div[4]/div[2]/input    ${PASSWORD}
    Sleep    2s
    Click Button    //*[@id="app"]/div/main/div[2]/div/form/button
    Sleep    4s

Verify Redirect To Login
    Location Should Be    http://localhost:3000/login
    Sleep    2s