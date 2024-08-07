class RadioGroup extends HTMLElement {
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    this.valueChanged(newValue);
  }
  async connectedCallback() {
    this.setAttribute("role", "radiogroup");
    crs.binding.dom.enableEvents(this);
    this._changedHandler = this._changed.bind(this);
    const radios = this.querySelectorAll("radio");
    await this._createUI(radios);
  }
  async disconnectedCallback() {
    crs.binding.dom.disableEvents(this);
    this._changedHandler = null;
  }
  async _createUI(radios) {
    this.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const group = this.dataset.name || "group";
    for (let radio of radios) {
      const title = radio.getAttribute("title");
      const value = radio.getAttribute("value");
      this._createRadio(title, value, group, fragment);
    }
    this.appendChild(fragment);
  }
  _createRadio(title, value, group, fragment) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const id = `${group}_${value}`;
    input.setAttribute("type", "radio");
    input.setAttribute("value", value);
    input.setAttribute("name", group);
    input.id = id;
    label.textContent = title;
    label.setAttribute("for", id);
    this.registerEvent(input, "change", this._changedHandler);
    fragment.appendChild(input);
    fragment.appendChild(label);
  }
  _changed(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent("change"));
  }
  async valueChanged(newValue) {
    const newChecked = this.querySelector(`[value="${newValue}"]`);
    if (newChecked != null) {
      newChecked.checked = true;
    }
  }
}
customElements.define("radio-group", RadioGroup);
export {
  RadioGroup
};
