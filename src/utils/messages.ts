export default {
    startMessage: `
*Hello 👋*
I am *Axcellent*, a bot with various assisting tools

Please choose your language
`,
    helpMessage: {
        arabic: `
أهلاً بك في *بوت أكسيلينت*، بوتً مجهز بالكثير من الأدوات المفيدة التي تسهل عليك أعمالك

*الأوامر العامة*
/start \\- للبدء بمحادثة جديدة باللغة المناسبة لك
/help \\- لإظهار الأوامر المتوفرة باللغة المناسبة لك
/settings \\- لإعادة ضبط لغة البوت
/info \\- لإظهار معلومات عن البوت وصانعه

*الخدمات المتوفرة*

*تحميل الفيديوهات من اليوتيوب أو التيكتوك*
لتحميل الفيديو، أرسل الرابط واختر الخيار المناسب

*تحويل الصور إلى ملف PDF*
لتحويل الصورة إلى ملف PDF، أرسل الصورة واختر الخيار المناسب

*تحميل الصور والفيديوهات والحصول على رابط لها*
لتحميل الملف، أرسل الملف واختر خيار التحميل

*الحصول على رابط لمحادثة الواتساب بدون الحاجة إلى تسجيل الرقم في هاتفك*
للحصول على رابط لمحادثة الواتساب، أرسل رقم الهاتف
`,

        english: `
Hi\\. I am *Axcellent Bot*, a bot equipped with various helpful assisting tools

*General Commands*
/start \\- start a new chat with me in your preferred language
/help \\- show help instructions and available commands
/settings \\- reset bot language
/info \\- show information about me and my creator

*Available Services*

*Downloading videos from YouTube or TikTok*
To download the video, send the link and select the appropriate option

*Converting images for PDF files*
To convert an image to PDF, send the image and select the appropriate option

*Uploading image and video files to the internet and getting access link*
To upload the file, send the file and select the appropriate option

*Getting WhatsApp chat link without having to save the contact to your phone*
To get the whatsapp chat link, send the mobile number
`,

        turkish: `
MERHABA\\. Ben *Axcellent Bot*, çeşitli yardımcı yardımcı araçlarla donatılmış bir botum

*Genel Komutlar*
/start \\- benimle tercih ettiğiniz dilde yeni bir sohbet başlatın
/help \\- yardım talimatlarını ve mevcut komutları göster
/settings \\- bot dilini sıfırla
/info \\- benimle ve yaratıcımla ilgili bilgileri göster

*Mevcut Hizmetler*

*YouTube veya TikTok'tan video indirme*
Videoyu indirmek için bağlantıyı gönderin ve uygun seçeneği belirleyin

*Görüntüleri PDF dosyaları için dönüştürme*
Bir görüntüyü PDF'ye dönüştürmek için görüntüyü gönderin ve uygun seçeneği belirleyin

*Görüntü ve video dosyalarının internete yüklenmesi ve erişim bağlantısının alınması*
Dosyayı karşıya yüklemek için dosyayı gönderin ve uygun seçeneği belirleyin

*Kişiyi telefonunuza kaydetmenize gerek kalmadan WhatsApp sohbet bağlantısını alma*
WhatsApp sohbet bağlantısını almak için cep telefonu numarasını gönderin
`,

        russian: `
Привет\\. Я *Axcellent Bot*, бот, оснащенный различными полезными вспомогательными инструментами

*Общие команды*
/start \\- начать новый чат со мной на предпочитаемом вами языке
/help \\- показать справочные инструкции и доступные команды
/settings \\- сбросить язык бота
/info \\- показать информацию обо мне и моем создателе

*Доступные услуги*

*Скачивание видео с YouTube или TikTok*
Чтобы скачать видео, пришлите ссылку и выберите подходящий вариант

*Конвертация изображений в файлы PDF*
Чтобы преобразовать изображение в PDF, отправьте изображение и выберите соответствующий вариант

*Загрузка изображений и видеофайлов в Интернет и получение ссылки для доступа*
Чтобы загрузить файл, отправьте файл и выберите соответствующий вариант

*Получение ссылки на чат WhatsApp без сохранения контакта на телефоне*
Чтобы получить ссылку на чат WhatsApp, отправьте номер мобильного телефона
`,
    },
    infoMessage: {
        arabic: `
مرحباً

أنا أكسيلينت، بوت مجهز بالعديد من الأدوات المفيدة المتنوعة، مثل تحميل الفيديوهات من منصات مختلفة، تحويل الصور إلى PDF ، الحصول على رابط للصور أو الفيديوهات، والمزيد\\!

من إبداعات @SwordaxSy
`,

        english: `
Welcome

I am Axcellent, a bot equipped with various helpful tools, such as downloading videos from different platforms, converting image to PDF, gettings links to images or videos, and much more\\!

Created by @SwordaxSy
`,

        turkish: `
Hoş geldin

Ben Axcellent, farklı platformlardan video indirme, görüntüyü PDF'ye dönüştürme, görüntülere veya videolara bağlantılar alma ve çok daha fazlası gibi çeşitli yardımcı araçlarla donatılmış bir botum\\!

@SwordaxSy tarafından düzenlendi
`,

        russian: `
Добро пожаловать

Я Axcellent, бот, оснащенный различными полезными инструментами, такими как загрузка видео с разных платформ, преобразование изображения в PDF, получение ссылок на изображения или видео и многое другое\\!

Создано @SwordaxSy
`,
    },
    languageSetMessage: {
        arabic: "تم تعيين اللغة العربية",
        english: "English language was set",
        turkish: "Türkçe dil ayarı yapıldı",
        russian: "был установлен русский язык",
    },
    whatsappCommandMessage: {
        arabic: "تم عمل رابط لمحادثة الواتساب",
        english: "WhatsApp chat link was created",
        turkish: "WhatsApp sohbet bağlantısı oluşturuldu",
        russian: "Ссылка на чат WhatsApp создана",
    },
    whatsappCommandButtonText: {
        arabic: "الإنتقال لمحادثة الواتساب",
        english: "Move to WhatsApp Chat",
        turkish: "WhatsApp Sohbetine Taşı",
        russian: "Перейти в чат WhatsApp",
    },
    onImageMessage: {
        arabic: "اختر العملية التي تريدها",
        english: "Choose the operation you want",
        turkish: "İstediğiniz işlemi seçin",
        russian: "Выберите нужную операцию",
    },
    waitMessage: {
        arabic: "الرجاء الإنتظار قليلاً 🤌🏻",
        english: "On the way! one sec 🤌🏻",
        turkish: "Bir süre bekleyin lütfen 🤌🏻",
        russian: "Пожалуйста, подождите 🤌🏻",
    },
    errorMessage: {
        arabic: "حدث خطأ ما! 😰",
        english: "Ooops! Something went wrong 😰",
        turkish: "Bir şeyler yanlış gitti 😰",
        russian: "Что-то пошло не так 😰",
    },
    underDevelopmentMessage: {
        arabic: "هذه الميزة تحت التطوير",
        english: "This feature is under development",
        turkish: "Bu özellik geliştirme aşamasındadır",
        russian: "Эта функция находится в разработке",
    },
    selectFormatMessage: {
        arabic: "اختر دقة الفيديو المناسبة لك",
        english: "Select your preferred video quality",
        turkish: "Tercih ettiğiniz video kalitesini seçin",
        russian: "Выберите предпочтительное качество видео",
    },
    resetLanguageMessage: {
        arabic: "إعادة ضبط اللغة",
        english: "Reset language",
        turkish: "Dili Sıfırla",
        russian: "Сбросить язык",
    },
    imageOperationsMessage: {
        arabic: {
            convert: "تحويل الصورة إلى ملف PDF",
            upload: "الحصول على رابط للصورة",
        },
        english: {
            convert: "Convert image to PDF",
            upload: "Get link to image",
        },
        turkish: {
            convert: "Görüntüyü PDF'ye dönüştür",
            upload: "Resmin bağlantısını al",
        },
        russian: {
            convert: "Преобразовать изображение в PDF",
            upload: "Получить ссылку на изображение",
        },
    },
};
