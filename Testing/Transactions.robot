*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${browser}      Edge
${url}          http://localhost:3000/

# Login
${email}        ayoub123@gmail.com
${PASSWORD}     1234pDDHHD

# Categories page
${URL_CATEGORIES}      http://localhost:3000/categories

# Elements
${btn_categories}   //*[@id="app"]/div/div/main/div/div[1]/button/span[2]
${Nomcategories}    //*[@id="app"]/div/div[2]/div/form/label[1]/input

# COLORS
${color_blue}   //*[@id="app"]/div/div[2]/div/form/div[1]/button[1]
${color_red}    //*[@id="app"]/div/div[2]/div/form/div[1]/button[5]
${color_green}  //*[@id="app"]/div/div[2]/div/form/div[1]/button[3]

# ICON SELECT
${icon_select}  //*[@id="app"]/div/div[2]/div/form/label[3]/div/select

${create}   //*[@id="app"]/div/div[2]/div/form/div[2]/button[2]

*** Test Cases ***
Create Category With General Icon
    Open Browser    ${url}    ${browser}
    Maximize Browser Window

    Signin
    Go To    ${URL_CATEGORIES}

    Create Category    General Cat 22-05-2026-01    blue    general

    Close Browser

Create Category With Travel Icon
    Open Browser    ${url}    ${browser}
    Maximize Browser Window

    Signin
    Go To    ${URL_CATEGORIES}

    Create Category    Travel Cat 22-05-2026-02    green    travel

    Close Browser

*** Keywords ***
Signin
    Click Element    xpath=//*[@id="app"]/body/div/div/header/div[2]/div/a[2]/span
    Sleep    2s

    Click Element    xpath=//*[@id="app"]/div/main/div[2]/div/div[2]/button[1]
    Sleep    2s

    Input Text    xpath=//*[@id="app"]/div/main/div[2]/div/form/div[1]/div/input    ${email}
    Sleep    2s

    Input Text    xpath=//*[@id="app"]/div/main/div[2]/div/form/div[2]/div[2]/input    ${PASSWORD}
    Sleep    2s

    Click Button    xpath=//*[@id="app"]/div/main/div[2]/div/form/button
    Sleep    4s

Create Category
    [Arguments]    ${name}    ${color}    ${icon_type}

    Wait Until Element Is Visible    ${btn_categories}    10s
    Click Element    ${btn_categories}
    Sleep    1s

    Input Text    ${Nomcategories}    ${name}
    Sleep    1s

    # COLORS
    Run Keyword If    '${color}' == 'blue'    Click Element    ${color_blue}
    Run Keyword If    '${color}' == 'red'     Click Element    ${color_red}
    Run Keyword If    '${color}' == 'green'   Click Element    ${color_green}
    Sleep    1s

    # ICONS (SELECT FIXED)
    Run Keyword If    '${icon_type}' == 'general'
    ...    Select From List By Value    ${icon_select}    label

    Run Keyword If    '${icon_type}' == 'travel'
    ...    Select From List By Value    ${icon_select}    travel

    Sleep    1s

    Click Element    ${create}
    Sleep    3s

Verify Redirect To Dashboard
    Location Should Be    http://localhost:3000/dashboard