// === ЧЕК-ЛИСТ ИЗ ДОКУМЕНТОВ (36 пунктов) ===
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

// === TELEGRAM WEB APP ===
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// === INDEXEDDB ===
let db;
const DB_NAME = 'InspectionDB';
const DB_VERSION = 1;
const STORE_NAME = 'inspections';

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'inspectionId' });
            }
        };
        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onerror = (e) => reject(e);
    });
}

// === UI RENDER ===
function renderChecklist() {
    const container = document.getElementById('checklistContainer');
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
                    <label class="photo-btn">
                        📷 Фото
                        <input type="file" accept="image/*" capture="environment" onchange="handlePhoto('${item.id}', this)">
                    </label>
                    <img class="photo-preview" id="photo-${item.id}">
                    <span class="photo-count" id="photo-count-${item.id}"></span>
                </div>
            `;
            itemsContainer.appendChild(itemEl);
        });
    });
    
    updateProgress();
}

function countCompletedInSection(items) {
    return items.filter(item => inspectionState.answers[item.id] && inspectionState.answers[item.id].status).length;
}

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

function generateId() {
    return 'INS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

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
        const counter = document.querySelector(`#section-${sectionIndex}`).previousElementSibling.querySelector('.section-counter');
        if (counter) {
            counter.textContent = `${completed}/${section.items.length}`;
        }
    });
}

// === PHOTO HANDLING ===
async function handlePhoto(itemId, input) {
    const file = input.files[0];
    if (!file) return;
    
    showToast('🔄 Сжатие фото...');
    const compressedBlob = await compressImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById(`photo-${itemId}`);
        preview.src = e.target.result;
        preview.classList.add('visible');
        
        if (!inspectionState.answers[itemId]) {
            inspectionState.answers[itemId] = { status: 'ok', comment: '' };
        }
        inspectionState.answers[itemId].photo = e.target.result;
        inspectionState.answers[itemId].photoName = `photo_${itemId.replace(/\./g, '_')}.jpg`;
        
        document.getElementById(`photo-count-${itemId}`).textContent = '✓ Фото добавлено';
        showToast('✓ Фото сохранено');
        autoSave();
    };
    reader.readAsDataURL(compressedBlob);
    input.value = '';
}

function compressImage(file, maxWidth = 1024, quality = 0.75) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((maxWidth / width) * height);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
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
        showToast('⚠️ Ошибка сохранения');
        console.error(err);
    }
}

// === SEND TO TELEGRAM ===
async function sendReport() {
    const storeNumber = document.getElementById('storeNumber').value.trim();
    
    if (!storeNumber) {
        showToast('⚠️ Введите номер магазина');
        document.getElementById('storeNumber').focus();
        tg.showAlert('Введите номер магазина');
        return;
    }
    
    await saveProgress();
    
    const reportData = {
        inspectionId: inspectionState.inspectionId,
        storeNumber: inspectionState.storeNumber,
        storeAddress: inspectionState.storeAddress,
        inspectorName: inspectionState.inspectorName,
        inspectorId: inspectionState.inspectorId,
        timestamp: inspectionState.timestamp,
        checklistVersion: '1.0',
        totalItems: CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0),
        answers: inspectionState.answers
    };
    
    const violations = Object.values(reportData.answers).filter(a => a.status === 'fail').length;
    
    // Формируем текст для Telegram
    const text = `📋 <b>ПРОВЕРКА МАГАЗИНА</b>

🏪 <b>Магазин:</b> ${reportData.storeNumber}
📍 <b>Адрес:</b> ${reportData.storeAddress || 'не указан'}
👤 <b>Ревизор:</b> ${reportData.inspectorName || 'не указан'}
🆔 <b>ID:</b> <code>${reportData.inspectorId || 'не указан'}</code>
🕐 <b>Дата:</b> ${new Date(reportData.timestamp).toLocaleString('ru-RU')}

📊 <b>Результаты:</b>
Всего пунктов: ${reportData.totalItems}
✅ Выполнено: ${reportData.totalItems - violations}
❌ Нарушений: ${violations}

Статус: ${violations === 0 ? '✅ БЕЗ НАРУШЕНИЙ' : '⚠️ ЕСТЬ НАРУШЕНИЯ'}

ID проверки: <code>${reportData.inspectionId}</code>`;
    
    // Отправка данных боту (через Telegram API)
    const botToken = 'ВАШ_ТОКЕН_БОТА'; // Замените на ваш токен
    const chatId = 'ВАШ_CHAT_ID'; // ID чата менеджера
    
    showToast('🔄 Отправка отчёта...');
    
    try {
        // Отправляем текст
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
        
        // Отправляем фото (если есть)
        const photos = Object.entries(inspectionState.answers).filter(([_, answer]) => answer.photo);
        
        for (let [itemId, answer] of photos) {
            const response = await fetch(answer.photo);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('photo', blob, `photo_${itemId.replace(/\./g, '_')}.jpg`);
            formData.append('caption', `Пункт ${itemId}: ${answer.comment || ''}`);
            
            await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        }
        
        // Отправляем JSON с данными
        const jsonBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const jsonFormData = new FormData();
        jsonFormData.append('chat_id', chatId);
        jsonFormData.append('document', jsonBlob, `inspection_${reportData.storeNumber}_${reportData.inspectionId}.json`);
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: jsonFormData
        });
        
        showToast('✅ Отчёт отправлен в Telegram!');
        
        // Используем нативную кнопку Telegram
        tg.MainButton.setText('ОТЧЁТ ОТПРАВЛЕН ✓');
        tg.MainButton.show();
        
        setTimeout(() => {
            tg.close();
        }, 2000);
        
    } catch (error) {
        showToast('⚠️ Ошибка отправки: ' + error.message);
        tg.showAlert('Ошибка отправки: ' + error.message);
    }
}

// === PROGRESS ===
function updateProgress() {
    const totalItems = CHECKLIST_DATA.reduce((sum, s) => sum + s.items.length, 0);
    const completedItems = Object.keys(inspectionState.answers).length;
    const progress = (completedItems / totalItems) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Показываем главную кнопку Telegram при 100%
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
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
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

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    renderChecklist();
    loadSavedInspection();
    
    // Получаем данные из Telegram
    const user = tg.initDataUnsafe.user;
    if (user) {
        const inspectorName = `${user.first_name} ${user.last_name || ''}`.trim();
        const userId = user.id.toString();
        
        if (inspectorName) {
            document.getElementById('inspectorName').value = inspectorName;
            document.getElementById('headerInfo').textContent = `Ревизор: ${inspectorName}`;
        }
        if (userId) {
            document.getElementById('inspectorId').value = userId;
        }
    }
    
    // Настройка цветов темы
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#f5f5f5');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#1f2937');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2563eb');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#9ca3af');
    
    // Haptic feedback
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
});