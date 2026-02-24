// ============================================================================
// ЧЕК-ЛИСТ ПРОВЕРКИ ПОМЕЩЕНИЙ МАГАЗИНА
// Версия: 2.1 (с исправлениями отладки)
// ============================================================================

console.log('🚀 App.js загружен');

// === TELEGRAM WEB APP ===
const tg = window.Telegram.WebApp;
console.log('Telegram WebApp:', tg);

// Инициализация
tg.ready();
tg.expand();
console.log('Telegram WebApp готов');

// Запрашиваем разрешения
try {
    tg.requestCameraAccess();
    tg.requestWriteAccess();
    console.log('Разрешения запрошены');
} catch (e) {
    console.warn('Не удалось запросить разрешения:', e);
}

// === CHECKLIST DATA (36 пунктов) ===
const CHECKLIST_DATA = [
    {
        section: "1. ОБЩИЕ ТРЕБОВАНИЯ",
        description: "Для всех помещений: чистота, отделка, освещение, электробезопасность",
        items: [
            { id: "1.1.1", text: "Пол/стены/потолок чистые; нет загрязнений, пыли, следов протечек" },
            { id: "1.1.2", text: "Отделка целая: нет трещин, сколов, отслоений, торчащих элементов" },
            { id: "1.1.3", text: "Проходы свободны; нет 'временного' складирования в проходах и у дверей" },
            { id: "1.2.1", text: "Освещение включается; неисправности (не горит/мигает) зафиксированы" },
            { id: "1.2.2", text: "Светильники/плафоны закреплены; нет трещин/разбитых элементов" },
            { id: "1.2.3", text: "Нет свисающих проводов/самодельных соединений в зоне видимости" },
            { id: "1.3.1", text: "Розетки/выключатели целые, без подпалин, закреплены" },
            { id: "1.3.2", text: "Провода/удлинители без повреждений; не лежат на проходах; нет 'гирлянд'" },
            { id: "1.3.3", text: "Электрощит/распредкоробки закрыты; доступ к ним не заставлен" }
        ]
    },
    {
        section: "2. ТОРГОВЫЙ ЗАЛ",
        description: "Безопасность посетителей и торгового оборудования",
        items: [
            { id: "2.1.1", text: "Нет скользких участков; при необходимости - уборка/обозначение" },
            { id: "2.1.2", text: "Коврики чистые, лежат ровно, не загибаются, не смещаются" },
            { id: "2.1.3", text: "Двери/вход работают штатно (открытие/закрытие, ручки, доводчик)" },
            { id: "2.2.1", text: "Стеллажи/витрины устойчивые, без повреждений, без торчащих/острых элементов" },
            { id: "2.2.2", text: "Полки/крепления целые; нет риска падения элементов или товара" },
            { id: "2.2.3", text: "Проходы не загромождены коробами, упаковкой и 'временным' хранением" }
        ]
    },
    {
        section: "3. ПОДСОБНОЕ (СКЛАДСКОЕ) ПОМЕЩЕНИЕ",
        description: "Безопасность работы и хранения товара",
        items: [
            { id: "3.1.1", text: "Освещение включается; неисправности зафиксированы; светильники закреплены" },
            { id: "3.1.2", text: "Нет оголённых проводов/самодельных подключений/опасных удлинителей" },
            { id: "3.1.3", text: "Электрощит закрыт; подход свободен (не заставлен коробами/картоном)" },
            { id: "3.2.1", text: "Стеллажи присутствуют и используются (основная масса товара не на полу)" },
            { id: "3.2.2", text: "Нет перекосов, деформаций, трещин, прогибов; крепёж на месте" },
            { id: "3.3.1", text: "Товар расставлен по зонам/категориям; нет хаотичных навалов" },
            { id: "3.3.2", text: "Проходы свободны; доступ к товару без необходимости постоянных 'перестановок'" },
            { id: "3.4.1", text: "Нет скопления картона/упаковки в проходах и рядом с электрооборудованием" },
            { id: "3.4.2", text: "Мусор убран; нет захламлённых углов/мест временного накопления отходов" }
        ]
    },
    {
        section: "4. УЧЕБНЫЙ КЛАСС",
        description: "Использование по назначению, мебель, безопасность",
        items: [
            { id: "4.1.1", text: "Отсутствуют товар, короба, паллеты, инвентарь и 'временное хранение'" },
            { id: "4.1.2", text: "Учебная зона и проходы свободны" },
            { id: "4.2.1", text: "Стулья со столиком присутствуют (факт наличия)" },
            { id: "4.2.2", text: "Исправность: не шатаются; крепления надёжны; столик фиксируется" },
            { id: "4.2.3", text: "Безопасность: нет острых кромок, трещин, сколов, торчащих элементов" },
            { id: "4.3.1", text: "Освещение включается; неисправности зафиксированы" },
            { id: "4.3.2", text: "Розетки/удлинители/кабели без повреждений; кабели не лежат на проходах" }
        ]
    },
    {
        section: "5. НЕИСПОЛЬЗУЕМЫЕ ПОМЕЩЕНИЯ",
        description: "По плану помещений: состояние и контроль доступа",
        items: [
            { id: "5.1.1", text: "Каждое помещение из плана найдено/идентифицировано при обходе" },
            { id: "5.1.2", text: "Зафиксированы помещения: закрыты/не используются/используются не по назначению" },
            { id: "5.2.1", text: "Помещение закрывается, доступ контролируется" },
            { id: "5.2.2", text: "Нет мусора/хлама, следов протечек/плесени, разрушений отделки" },
            { id: "5.2.3", text: "Электробезопасность: нет опасных подключений, оголённых проводов, 'временных' приборов" }
        ]
    }
];

console.log('Чек-лист загружен:', CHECKLIST_DATA.length, 'разделов');

// === STATE MANAGEMENT ===
const inspectionState = {
    inspectionId: null,
    storeNumber: '',
    storeAddress: '',
    inspectorName: '',
    inspectorId: '',
    timestamp: null,
    answers: {}
};

// === INDEXEDDB ===
let db;
const DB_NAME = 'InspectionDB';
const DB_VERSION = 1;
const STORE_NAME = 'inspections';

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (e) => {
            console.log('Создание базы данных');
            db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'inspectionId' });
                store.createIndex('storeNumber', 'storeNumber', { unique: false });
                store.createIndex('timestamp', 'timestamp', { unique: false });
                store.createIndex('inspectorId', 'inspectorId', { unique: false });
            }
        };
        
        request.onsuccess = (e) => {
            db = e.target.result;
            console.log('База данных инициализирована');
            resolve(db);
        };
        
        request.onerror = (e) => {
            console.error('Ошибка базы данных:', e);
            reject(e);
        };
    });
}

// === UI RENDER ===
function renderChecklist() {
    console.log('Рендеринг чек-листа...');
    const container = document.getElementById('checklistContainer');
    
    if (!container) {
        console.error('Контейнер checklistContainer не найден!');
        return;
    }
    
    container.innerHTML = '';
    
    CHECKLIST_DATA.forEach((section, sectionIndex) => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'section';
        const completedInSection = countCompletedInSection(section.items);
        
        sectionEl.innerHTML = `
            <div class="section-header">
                <h3>${section.section} <span class="section-counter">${completedInSection}/${section.items.length}</span></h3>
                <p>${section.description}</p>
            </div>
            <div id="section-${sectionIndex}"></div>
        `;
        
        container.appendChild(sectionEl);
        
        const itemsContainer = sectionEl.querySelector(`#section-${sectionIndex}`);
        
        section.items.forEach((item) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item';
            itemEl.innerHTML = `
                <div class="item-id">Пункт ${item.id}</div>
                <div class="item-text">${item.text}</div>
                <div class="status-toggle">
                    <button class="status-btn ok" onclick="setStatus('${item.id}', 'ok', this)">✅ Норма</button>
                    <button class="status-btn fail" onclick="setStatus('${item.id}', 'fail', this)">❌ Нарушение</button>
                </div>
                <textarea class="comment-field" id="comment-${item.id}" placeholder="Опишите нарушение подробно..." rows="2"></textarea>
                <div class="photo-upload">
                    <button class="photo-btn" onclick="selectPhoto('${item.id}')">
                        📷 Добавить фото
                    </button>
                    <img class="photo-preview" id="photo-${item.id}">
                    <span class="photo-count" id="photo-count-${item.id}"></span>
                </div>
            `;
            itemsContainer.appendChild(itemEl);
        });
    });
    
    console.log('Чек-лист отрисован');
    updateProgress();
}

function countCompletedInSection(items) {
    return items.filter(item => 
        inspectionState.answers[item.id] && 
        inspectionState.answers[item.id].status
    ).length;
}

// === STATUS HANDLING ===
function setStatus(itemId, status, btnElement) {
    const parent = btnElement.parentElement;
    parent.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    
    const commentField = document.getElementById(`comment-${itemId}`);
    
    if (status === 'fail') {
        commentField.classList.add('visible');
        commentField.focus();
    } else {
        commentField.classList.remove('visible');
    }
    
    if (!inspectionState.answers[itemId]) {
        inspectionState.answers[itemId] = {};
    }
    
    inspectionState.answers[itemId].status = status;
    
    if (status === 'ok') {
        inspectionState.answers[itemId].comment = '';
    }
    
    updateSectionCounters();
    updateProgress();
    autoSave();
}

function updateSectionCounters() {
    CHECKLIST_DATA.forEach((section, sectionIndex) => {
        const completed = countCompletedInSection(section.items);
        const counter = document.querySelector(
            `#section-${sectionIndex}`
        ).previousElementSibling.querySelector('.section-counter');
        
        if (counter) {
            counter.textContent = `${completed}/${section.items.length}`;
        }
    });
}

// === PHOTO HANDLING ===
let currentPhotoItemId = null;

function selectPhoto(itemId) {
    currentPhotoItemId = itemId;
    console.log('Выбор фото для пункта:', itemId);
    
    // Показываем выбор через Telegram или стандартный input
    tg.showPopup({
        title: '📷 Добавить фото',
        message: 'Выберите способ добавления фото',
        buttons: [
            {
                type: 'button',
                text: '📷 Камера',
                callback: () => openFileInput(itemId, 'camera')
            },
            {
                type: 'button',
                text: '🖼️ Галерея',
                callback: () => openFileInput(itemId, 'gallery')
            },
            {
                type: 'cancel',
                text: 'Отмена'
            }
        ]
    });
}

function openFileInput(itemId, type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    if (type === 'camera') {
        input.capture = 'environment';
    }
    
    input.style.display = 'none';
    document.body.appendChild(input);
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePhotoFile(itemId, file);
        }
        setTimeout(() => {
            if (document.body.contains(input)) {
                document.body.removeChild(input);
            }
        }, 1000);
    };
    
    input.click();
}

function handlePhotoFile(itemId, file) {
    if (!file.type.startsWith('image/')) {
        showToast('⚠️ Пожалуйста, выберите изображение');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showToast('⚠️ Фото слишком большое (макс. 5MB)');
        return;
    }
    
    showToast('🔄 Обработка фото...');
    
    const reader = new FileReader();
    reader.onload = (e) => savePhoto(itemId, e.target.result);
    reader.onerror = () => showToast('⚠️ Ошибка чтения файла');
    reader.readAsDataURL(file);
}

function savePhoto(itemId, base64Data) {
    const preview = document.getElementById(`photo-${itemId}`);
    preview.src = base64Data;
    preview.classList.add('visible');
    
    if (!inspectionState.answers[itemId]) {
        inspectionState.answers[itemId] = { status: 'ok', comment: '' };
    }
    
    inspectionState.answers[itemId].photo = base64Data;
    inspectionState.answers[itemId].photoName = `punkt_${itemId.replace(/\./g, '_')}.jpg`;
    
    document.getElementById(`photo-count-${itemId}`).textContent = '✓ Фото добавлено';
    showToast('✓ Фото сохранено');
    autoSave();
}

// === AUTO-SAVE ===
let autoSaveTimeout;

function autoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(saveProgress, 1500);
}

async function saveProgress() {
    inspectionState.storeNumber = document.getElementById('storeNumber').value.trim();
    inspectionState.storeAddress = document.getElementById('storeAddress').value.trim();
    inspectionState.inspectorName = document.getElementById('inspectorName').value.trim();
    inspectionState.inspectorId = document.getElementById('inspectorId').value.trim();
    inspectionState.timestamp = new Date().toISOString();
    
    CHECKLIST_DATA.forEach(section => {
        section.items.forEach(item => {
            const commentEl = document.getElementById(`comment-${item.id}`);
            if (commentEl && inspectionState.answers[item.id]) {
                inspectionState.answers[item.id].comment = commentEl.value.trim();
            }
        });
    });
    
    if (!inspectionState.inspectionId) {
        inspectionState.inspectionId = generateId();
    }
    
    try {
        await initDB();
        const tx = db.transaction([STORE_NAME], 'readwrite');
        tx.objectStore(STORE_NAME).put(inspectionState);
        await tx.complete;
        
        const totalItems = CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0);
        const completedItems = Object.keys(inspectionState.answers).length;
        showToast(`💾 Сохранено (${completedItems}/${totalItems})`);
    } catch (err) {
        console.error('Ошибка сохранения:', err);
        showToast('⚠️ Ошибка сохранения');
    }
}

function generateId() {
    return 'INS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// === GENERATE EXCEL ===
async function generateExcelReport() {
    if (typeof ExcelJS === 'undefined') {
        throw new Error('Библиотека ExcelJS не загружена');
    }
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Проверка');
    
    worksheet.columns = [
        { header: 'Раздел', key: 'section', width: 30 },
        { header: 'Пункт', key: 'item_id', width: 10 },
        { header: 'Описание проверки', key: 'description', width: 60 },
        { header: 'Статус', key: 'status', width: 15 },
        { header: 'Комментарий', key: 'comment', width: 40 },
        { header: 'Фото файл', key: 'photo', width: 20 }
    ];
    
    worksheet.addRow(['Магазин:', inspectionState.storeNumber]).font = { bold: true };
    worksheet.addRow(['Адрес:', inspectionState.storeAddress || 'не указан']);
    worksheet.addRow(['Ревизор:', inspectionState.inspectorName || 'не указан']);
    worksheet.addRow(['Дата:', new Date(inspectionState.timestamp).toLocaleString('ru-RU')]);
    
    const violations = Object.values(inspectionState.answers).filter(a => a.status === 'fail').length;
    const totalItems = CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0);
    
    worksheet.addRow(['Всего пунктов:', totalItems]);
    worksheet.addRow(['Нарушений:', violations]);
    worksheet.addRow(['Статус:', violations === 0 ? '✅ БЕЗ НАРУШЕНИЙ' : '⚠️ ЕСТЬ НАРУШЕНИЯ']);
    worksheet.addRow([]);
    
    CHECKLIST_DATA.forEach(section => {
        section.items.forEach(item => {
            const answer = inspectionState.answers[item.id] || {};
            const photoFileName = answer.photo ? answer.photoName : '';
            
            worksheet.addRow({
                section: section.section,
                item_id: item.id,
                description: item.text,
                status: answer.status === 'ok' ? '✅ Норма' : (answer.status === 'fail' ? '❌ Нарушение' : ''),
                comment: answer.comment || '',
                photo: photoFileName
            });
        });
    });
    
    return await workbook.xlsx.writeBuffer();
}

// === SEND REPORT ===
async function sendReport() {
    const storeNumber = document.getElementById('storeNumber').value.trim();
    
    if (!storeNumber) {
        showToast('⚠️ Введите номер магазина');
        tg.showAlert('Введите номер магазина');
        return;
    }
    
    await saveProgress();
    
    const violations = Object.values(inspectionState.answers).filter(a => a.status === 'fail').length;
    const totalItems = CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0);
    const photoCount = Object.values(inspectionState.answers).filter(a => a.photo).length;
    
    showToast('🔄 Генерация отчёта...');
    
    try {
        const excelBuffer = await generateExcelReport();
        const excelBlob = new Blob([excelBuffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        const excelUrl = URL.createObjectURL(excelBlob);
        const excelLink = document.createElement('a');
        excelLink.href = excelUrl;
        excelLink.download = `Проверка_${storeNumber}_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(excelLink);
        excelLink.click();
        document.body.removeChild(excelLink);
        URL.revokeObjectURL(excelUrl);
        
        showToast('✅ Excel скачан!');
        
        const reportText = `📋 ПРОВЕРКА МАГАЗИНА

🏪 Магазин: ${storeNumber}
📍 Адрес: ${inspectionState.storeAddress || 'не указан'}
👤 Ревизор: ${inspectionState.inspectorName || 'не указан'}
📊 Нарушений: ${violations} из ${totalItems}
📸 Фото: ${photoCount} шт.

${violations === 0 ? '✅ БЕЗ НАРУШЕНИЙ' : '⚠️ ЕСТЬ НАРУШЕНИЯ'}

ID: ${inspectionState.inspectionId}`;
        
        try {
            await navigator.clipboard.writeText(reportText);
            showToast('✅ Текст скопирован!');
        } catch (err) {
            console.error('Clipboard error:', err);
        }
        
        setTimeout(() => {
            tg.showAlert(
                '✅ ОТЧЁТ ГОТОВ!\n\n' +
                '📥 Скачан файл: Проверка_' + storeNumber + '.xlsx\n\n' +
                '📋 Текст отчёта скопирован\n\n' +
                '📲 Теперь:\n' +
                '1. Нажмите OK\n' +
                '2. Откройте чат с получателем\n' +
                '3. Вставьте текст (долгий тап)\n' +
                '4. Прикрепите скачанный Excel файл\n' +
                '5. Отправьте сообщение',
                () => {
                    tg.close();
                }
            );
        }, 1000);
        
    } catch (error) {
        console.error('Error:', error);
        showToast('⚠️ Ошибка: ' + error.message);
        tg.showAlert('Ошибка генерации отчёта:\n' + error.message);
    }
}

// === PROGRESS ===
function updateProgress() {
    const totalItems = CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0);
    const completedItems = Object.keys(inspectionState.answers).length;
    const progress = (completedItems / totalItems) * 100;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    if (progress === 100) {
        tg.MainButton.setText('📤 ОТПРАВИТЬ ОТЧЁТ');
        tg.MainButton.onClick(sendReport);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// === TOAST ===
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 2500);
    } else {
        console.log('Toast:', message);
    }
}

// === LOAD SAVED DATA ===
async function loadSavedInspection() {
    try {
        await initDB();
        const tx = db.transaction([STORE_NAME], 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();
        
        request.onsuccess = () => {
            const inspections = request.result;
            
            if (inspections.length > 0) {
                const last = inspections[inspections.length - 1];
                
                inspectionState.inspectionId = last.inspectionId;
                inspectionState.storeNumber = last.storeNumber || '';
                inspectionState.storeAddress = last.storeAddress || '';
                inspectionState.inspectorName = last.inspectorName || '';
                inspectionState.inspectorId = last.inspectorId || '';
                
                document.getElementById('storeNumber').value = last.storeNumber || '';
                document.getElementById('storeAddress').value = last.storeAddress || '';
                document.getElementById('inspectorName').value = last.inspectorName || '';
                document.getElementById('inspectorId').value = last.inspectorId || '';
                
                Object.entries(last.answers || {}).forEach(([itemId, answer]) => {
                    const btns = document.querySelectorAll(`button[onclick*="'${itemId}'"]`);
                    
                    if (answer.status === 'ok' && btns[0]) {
                        btns[0].classList.add('active');
                    } else if (answer.status === 'fail' && btns[1]) {
                        btns[1].classList.add('active');
                        
                        const commentEl = document.getElementById(`comment-${itemId}`);
                        if (commentEl) {
                            commentEl.classList.add('visible');
                            commentEl.value = answer.comment || '';
                        }
                    }
                    
                    if (answer.photo) {
                        const preview = document.getElementById(`photo-${itemId}`);
                        if (preview) {
                            preview.src = answer.photo;
                            preview.classList.add('visible');
                        }
                        
                        const countEl = document.getElementById(`photo-count-${itemId}`);
                        if (countEl) countEl.textContent = '✓ Фото добавлено';
                    }
                });
                
                updateSectionCounters();
                updateProgress();
                showToast('📂 Последняя проверка загружена');
            }
        };
    } catch (err) {
        console.error('Load error:', err);
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    
    // Проверяем Telegram WebApp
    if (!tg) {
        console.error('Telegram WebApp не доступен!');
        showToast('⚠️ Ошибка: Telegram WebApp не загружен');
    } else {
        console.log('Telegram WebApp доступен');
        
        // Получаем данные пользователя
        const user = tg.initDataUnsafe.user;
        console.log('User data:', user);
        
        if (user) {
            const inspectorName = `${user.first_name} ${user.last_name || ''}`.trim();
            const userId = user.id.toString();
            
            if (inspectorName) {
                document.getElementById('inspectorName').value = inspectorName;
                document.getElementById('headerInfo').textContent = `Ревизор: ${inspectorName}`;
                inspectionState.inspectorName = inspectorName;
            }
            
            if (userId) {
                document.getElementById('inspectorId').value = userId;
                inspectionState.inspectorId = userId;
            }
        } else {
            console.warn('Данные пользователя не получены');
            document.getElementById('headerInfo').textContent = 'Ревизор: не авторизован';
        }
    }
    
    // Применяем тему Telegram
    if (tg.themeParams) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#f5f5f5');
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#1f2937');
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2563eb');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#9ca3af');
    }
    
    // Рендерим чек-лист
    renderChecklist();
    
    // Загружаем сохранённые данные
    loadSavedInspection();
    
    console.log('Инициализация завершена');
});
