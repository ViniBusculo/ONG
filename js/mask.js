// máscaras simples sem bibliotecas externas
(function () {
  function setCursorToEnd(el) {
    try {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    } catch (e) {}
  }

  function cpfMask(v) {
    return v
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function telMask(v) {
    v = v.replace(/\D/g, '');
    if (v.length > 10) {
      return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }

  function cepMask(v) {
    return v.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})/, '$1-$2');
  }

  function attach(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      const start = this.selectionStart;
      this.value = fn(this.value);
      setCursorToEnd(this);
    });
  }

  // anexa máscaras quando DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function () {
    attach('cpf', cpfMask);
    attach('telefone', telMask);
    attach('cep', cepMask);
  });
})();