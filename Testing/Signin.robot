*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${browser}      Edge
${url}          http://localhost:3000/
${email}    ayoub123@gmail.com
${PASSWORD}     1234pDDHHD

*** Test Cases ***
Signin With Valid Data
    LunchBrowser 
    Signin
    Verify Redirect To Dashboard

*** Keywords ***
LunchBrowser
    Open Browser    ${url}    ${browser}
    Maximize Browser Window
    Sleep    6s

Signin
    Click Element    //*[@id="app"]/body/div/div/header/div[2]/div/a[2]/span
    Sleep    2s
    Click Element    //*[@id="app"]/div/main/div[2]/div/div[2]/button[1]
    Sleep    2s
    Input Text    //*[@id="app"]/div/main/div[2]/div/form/div[1]/div/input    ${email}
    Sleep    2s
    Input Text    //*[@id="app"]/div/main/div[2]/div/form/div[2]/div[2]/input    ${PASSWORD}
    Sleep    2s
    Click Button    //*[@id="app"]/div/main/div[2]/div/form/button
    Sleep    4s

Verify Redirect To Dashboard
    Location Should Be    http://localhost:3000/dashboard
    Sleep    2s