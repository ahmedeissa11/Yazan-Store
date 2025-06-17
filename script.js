/* JavaScript Code Goes Here */
// دالة لإخفاء كل الصور الرمزية
function hideAllAvatars() {
  const maleAvatar = document.getElementById("male-avatar");
  const femaleAvatar = document.getElementById("female-avatar");
  const customAvatar = document.getElementById("custom-avatar");

  if (maleAvatar) maleAvatar.style.display = "none";
  if (femaleAvatar) femaleAvatar.style.display = "none";
  if (customAvatar) customAvatar.style.display = "none";
}

// دالة لعرض الصورة الرمزية المطلوبة
function showAvatar(type, src = null) {
  hideAllAvatars();

  if (type === 'male') {
    const maleAvatar = document.getElementById("male-avatar");
    if (maleAvatar) maleAvatar.style.display = "block";
  } else if (type === 'female') {
    const femaleAvatar = document.getElementById("female-avatar");
    if (femaleAvatar) femaleAvatar.style.display = "block";
  } else if (type === 'custom' && src) {
    const customAvatar = document.getElementById('custom-avatar');
    if (customAvatar) {
      customAvatar.src = src;
      customAvatar.style.display = "block";
      customAvatar.onload = () => URL.revokeObjectURL(src);
    }
  }
}

// دالة للتعامل مع تحميل المستخدم لصورته
function previewAvatar(event) {
  const file = event.target.files[0];

  if (file) {
    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      showAvatar('custom', imageUrl);
    } else {
      alert('من فضلك اختار ملف صورة صحيح (زي JPG, PNG)! 🤨');
      event.target.value = '';
      showAvatar('male');
    }
  }
}

// لما الصفحة تحمل، بنعرض الأفاتار الذكر كافتراضي
document.addEventListener('DOMContentLoaded', () => {
  showAvatar('male');

  // الكود ده خاص بالترانزيشن بين الصفحات 👇
  // لما الصفحة الجديدة تحمل، بنخليها تظهر بتأثير fade-in
  document.body.classList.remove('fade-out');
  document.body.classList.add('fade-in');

  // بنسمع أي ضغط على أي لينك (<a>) في الصفحة
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // بنتأكد إن اللينك ده فعلاً لصفحة تانية ومش مجرد # أو بيفتح في تاب جديدة
      if (href && href !== '#' && !this.target && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        e.preventDefault(); // بنوقف الانتقال العادي للصفحة مؤقتًا

        document.body.classList.add('fade-out'); // بنضيف كلاس الـ fade-out عشان تعمل تأثير التلاشي

        setTimeout(() => {
          window.location.href = href; // بعد نص ثانية (مدة الترانزيشن) بننقل للصفحة الجديدة
        }, 500); // 500ms = 0.5s (لازم تكون نفس مدة الترانزيشن في الـ CSS)
      }
    });
  });
});