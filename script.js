const machine = document.querySelector(".hero-machine");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let floatingAnimation;

function updateMachineAnimation() {
    if (!machine || !window.gsap) {
        return;
    }

    if (floatingAnimation) {
        floatingAnimation.kill();
    }

    gsap.set(machine, { y: 0 });

    if (reducedMotion.matches) {
        return;
    }

    floatingAnimation = gsap.to(machine, {
        y: -14,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

if (window.gsap) {
    updateMachineAnimation();
    reducedMotion.addEventListener("change", updateMachineAnimation);
}

if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector(".hero");
    const contentFrame = document.querySelector(".content-frame");
    const heroTitle = document.querySelector(".hero-title");
    const heroKicker = document.querySelector(".hero-kicker");
    const machineWrap = document.querySelector(".machine-wrap");
    const aboutTitle = document.querySelector(".about-title");
    const aboutLine = document.querySelector(".about-line");
    const aboutParagraphs = gsap.utils.toArray(".about-copy p");
    const brandStatement = document.querySelector(".brand-statement");
    const brandStatementTitle = document.querySelector(".brand-statement-title");
    const brandMarquee = document.querySelector(".brand-marquee");
    const purposeSection = document.querySelector(".purpose-section");
    const purposeVisual = document.querySelector(".purpose-visual");
    const purposeBlocks = gsap.utils.toArray(".purpose-block");
    const servicesSection = document.querySelector(".services-section");
    const servicesTitle = document.querySelector(".services-title");
    const serviceItems = gsap.utils.toArray(".service-item");
    const servicesNote = document.querySelector(".services-note");
    const responsiveAnimations = gsap.matchMedia();

    responsiveAnimations.add({
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        const { desktop, mobile, reduceMotion: shouldReduceMotion } = context.conditions;

        if (shouldReduceMotion) {
            return;
        }

        if (desktop) {
            const desktopTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    scroller: contentFrame,
                    start: "top top",
                    end: "+=2400",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            desktopTimeline
                .to({}, { duration: 0.3 })
                .to([heroTitle, heroKicker], {
                    autoAlpha: 0,
                    y: -30,
                    duration: 0.75,
                    ease: "none"
                })
                .to(machineWrap, {
                    x: () => Math.min(window.innerWidth * 0.25, 470),
                    scale: 0.82,
                    duration: 1.15,
                    ease: "power1.inOut"
                }, 0.45)
                .fromTo(aboutTitle, {
                    autoAlpha: 0,
                    x: -50,
                    y: -48
                }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.65,
                    ease: "power1.out"
                }, 1.1)
                .fromTo(aboutLine, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    duration: 0.6,
                    ease: "power1.out"
                }, 1.25)
                .fromTo(aboutParagraphs, {
                    autoAlpha: 0,
                    y: 24
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.13,
                    ease: "power1.out"
                }, 1.4)
                .to({}, { duration: 0.45 });
        }

        if (mobile) {
            const mobileTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    scroller: contentFrame,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.8,
                    invalidateOnRefresh: true
                }
            });

            mobileTimeline
                .to([heroTitle, heroKicker], {
                    autoAlpha: 0,
                    y: -20,
                    duration: 0.55,
                    ease: "none"
                })
                .to(machineWrap, {
                    x: () => window.innerWidth * 0.12,
                    scale: 0.86,
                    duration: 0.7,
                    ease: "power1.inOut"
                }, 0)
                .fromTo(aboutTitle, {
                    autoAlpha: 0,
                    y: -36
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power1.out"
                }, 0.42)
                .fromTo(aboutLine, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    duration: 0.45,
                    ease: "power1.out"
                }, 0.48)
                .fromTo(aboutParagraphs, {
                    autoAlpha: 0,
                    y: 20
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: "power1.out"
                }, 0.52);
        }

        gsap.timeline({
            scrollTrigger: {
                trigger: brandStatement,
                scroller: contentFrame,
                start: "top 82%",
                end: "top 28%",
                scrub: 0.8,
                invalidateOnRefresh: true
            }
        })
            .fromTo(brandStatementTitle, {
                autoAlpha: 0,
                y: 48,
                scale: 0.94
            }, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                ease: "power1.out"
            })
            .fromTo(brandMarquee, {
                autoAlpha: 0,
                y: 28
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power1.out"
            }, 0.35);

        const purposeEntrance = gsap.timeline({
            scrollTrigger: {
                trigger: purposeSection,
                scroller: contentFrame,
                start: "top bottom",
                end: "top top",
                scrub: 0.8,
                invalidateOnRefresh: true
            }
        });

        purposeEntrance.fromTo(purposeVisual, {
            autoAlpha: 0.75,
            yPercent: -6,
            scale: 1.14
        }, {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: "power1.out"
        });

        if (desktop) {
            const purposeTextTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: purposeSection,
                    scroller: contentFrame,
                    start: "top top",
                    end: "+=1800",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            purposeTextTimeline
                .to({}, { duration: 0.3 })
                .fromTo(purposeBlocks, {
                    autoAlpha: 0,
                    x: 54,
                    y: 18
                }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.22,
                    ease: "power1.out"
                })
                .to({}, { duration: 0.4 });
        }

        if (mobile) {
            gsap.fromTo(purposeBlocks, {
                autoAlpha: 0,
                x: 32,
                y: 18
            }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                stagger: 0.16,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: purposeSection,
                    scroller: contentFrame,
                    start: "top 72%",
                    end: "top 18%",
                    scrub: 0.8,
                    invalidateOnRefresh: true
                }
            });
        }

        gsap.timeline({
            scrollTrigger: {
                trigger: servicesSection,
                scroller: contentFrame,
                start: "top 84%",
                end: "top 24%",
                scrub: 0.85,
                invalidateOnRefresh: true
            }
        })
            .fromTo(servicesTitle, {
                autoAlpha: 0,
                x: -42
            }, {
                autoAlpha: 1,
                x: 0,
                duration: 0.65,
                ease: "power1.out"
            })
            .fromTo(serviceItems, {
                autoAlpha: 0,
                y: 22
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power1.out"
            }, 0.18)
            .fromTo(servicesNote, {
                autoAlpha: 0,
                y: 16
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power1.out"
            }, 0.42);
    });

    window.addEventListener("load", () => ScrollTrigger.refresh());

    if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
}

const servicesCollage = document.querySelector(".services-collage");
const interactivePhotos = [...document.querySelectorAll(".collage-photo")];
const floatingContact = document.querySelector(".floating-contact");
const floatingTrigger = document.querySelector(".floating-trigger");
const chatbotButton = document.querySelector(".floating-chatbot");
const chatPanel = document.querySelector(".chat-panel");
const chatClose = document.querySelector(".chat-close");
const chatBody = document.querySelector(".chat-body");
const chatMessages = document.querySelector(".chat-messages");
const chatForm = document.querySelector(".chat-composer");
const chatInput = document.querySelector(".chat-input");
const chatSend = document.querySelector(".chat-send");
const chatQuickActions = [...document.querySelectorAll("[data-chat-message]")];
const contentFrame = document.querySelector(".content-frame");
const navigationLinks = [...document.querySelectorAll(".nav-links a, .logo")];
const sectionLinks = [...document.querySelectorAll(".nav-links a")];

const chatLinks = {
    instagram: "https://www.instagram.com/_rawis.barber?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==",
    map: "https://www.google.com/maps/search/?api=1&query=14.5337808%2C-90.5504375"
};

let chatIsResponding = false;

function normalizeChatText(text) {
    return text
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function includesChatKeyword(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
}

function getChatResponse(message) {
    const text = normalizeChatText(message);
    const asksForRecommendation = includesChatKeyword(text, [
        "recomienda", "recomendacion", "que me queda", "que corte", "no se que", "sugerencia"
    ]);
    const asksForCut = includesChatKeyword(text, [
        "corte", "cabello", "pelo", "fade", "degradado", "clasico", "moderno"
    ]);
    const asksForBeard = includesChatKeyword(text, [
        "barba", "ceja", "cejas", "perfilado", "tallado"
    ]);

    if (includesChatKeyword(text, [
        "reservar", "reserva", "cita", "agendar", "agenda", "apartar", "apartame", "espacio", "disponibilidad"
    ])) {
        return {
            text: "¡De una! Las citas se coordinan por Instagram. Escribinos por mensaje directo y te confirmamos el espacio disponible.",
            link: { label: "Reservar por Instagram", url: chatLinks.instagram }
        };
    }

    if (includesChatKeyword(text, [
        "horario", "hora", "abren", "abierto", "atienden", "atencion", "lunes", "viernes", "domingo"
    ])) {
        return {
            text: "Atendemos de lunes a viernes de 5:00 p. m. a 10:00 p. m. y los domingos por la mañana. Te recomendamos confirmar disponibilidad por Instagram."
        };
    }

    if (includesChatKeyword(text, [
        "donde", "ubicacion", "direccion", "llegar", "mapa", "villa hermosa", "petapa"
    ])) {
        return {
            text: "Estamos en Prados de Villa Hermosa, Zona 7 de San Miguel Petapa. Aquí puedes abrir la ubicación:",
            link: { label: "Ver en Google Maps", url: chatLinks.map }
        };
    }

    if (includesChatKeyword(text, ["instagram", "redes", "red social", "perfil", "usuario"])) {
        return {
            text: "Nos encuentras en Instagram como @_rawis.barber. Por ahí también puedes consultar disponibilidad y reservar.",
            link: { label: "Abrir Instagram", url: chatLinks.instagram }
        };
    }

    if (asksForRecommendation) {
        if (asksForBeard) {
            return {
                text: "Para definir mejor el rostro te recomendamos el tallado de barba y perfilado de cejas por Q15. Queda nítido y bien limpio."
            };
        }

        return {
            text: "Si quieres un cambio completo, el corte clásico o moderno por Q40 es la mejor opción. Todos los servicios incluyen mascarilla de carbón activado por parte de la casa."
        };
    }

    if (asksForCut && asksForBeard) {
        return {
            text: "El corte clásico o moderno cuesta Q40 y el tallado de barba con perfilado de cejas Q15. Ambos incluyen mascarilla de carbón activado."
        };
    }

    if (includesChatKeyword(text, ["rasurado", "rasurar", "afeitado", "afeitar"])) {
        return {
            text: "El rasurado tiene un precio de Q10 e incluye mascarilla de carbón activado por parte de la casa."
        };
    }

    if (asksForBeard) {
        return {
            text: "El tallado de barba y perfilado de cejas tiene un precio de Q15. También incluye mascarilla de carbón activado."
        };
    }

    if (asksForCut) {
        return {
            text: "El corte clásico o moderno cuesta Q40 e incluye mascarilla de carbón activado por parte de la casa."
        };
    }

    if (includesChatKeyword(text, [
        "servicio", "servicios", "precio", "precios", "cuanto", "cuesta", "tarifa", "mascarilla"
    ])) {
        return {
            text: "Tenemos corte clásico o moderno por Q40, tallado de barba y perfilado de cejas por Q15, y rasurado por Q10. Todos incluyen mascarilla de carbón activado."
        };
    }

    if (includesChatKeyword(text, [
        "hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "que onda", "hey"
    ])) {
        return {
            text: "¡Qué onda! Buena onda por escribirnos. Te puedo ayudar con servicios, precios, horarios, ubicación o citas."
        };
    }

    if (includesChatKeyword(text, ["gracias", "adios", "hasta luego", "buena onda"])) {
        return {
            text: "¡Buena onda! Aquí estamos para cuando quieras darle con todo a tu próximo estilo."
        };
    }

    return {
        text: "No caché bien esa pregunta. Prueba escribiendo servicios, precios, horario, ubicación o cita y con gusto te ayudo."
    };
}

function getChatTime() {
    return new Intl.DateTimeFormat("es-GT", {
        hour: "numeric",
        minute: "2-digit"
    }).format(new Date());
}

function createChatMessage(sender, response) {
    if (!chatMessages) {
        return;
    }

    const message = document.createElement("div");
    const label = document.createElement("span");
    const copy = document.createElement("p");
    const time = document.createElement("time");
    const isUser = sender === "user";

    message.className = `chat-message ${isUser ? "chat-message-user" : "chat-message-bot"}`;
    label.className = "chat-message-label";
    label.textContent = isUser ? "TÚ" : "RAWI’S";
    copy.textContent = typeof response === "string" ? response : response.text;
    time.textContent = getChatTime();

    message.append(label, copy);

    if (!isUser && response.link) {
        const link = document.createElement("a");
        link.href = response.link.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = `${response.link.label} ↗`;
        message.append(link);
    }

    message.append(time);
    chatMessages.append(message);
}

function scrollChatToBottom() {
    chatBody?.scrollTo({
        top: chatBody.scrollHeight,
        behavior: reducedMotion.matches ? "auto" : "smooth"
    });
}

function createTypingIndicator() {
    const typing = document.createElement("div");
    typing.className = "chat-typing";
    typing.setAttribute("aria-label", "RAWI'S está escribiendo");

    for (let index = 0; index < 3; index += 1) {
        typing.append(document.createElement("span"));
    }

    chatMessages?.append(typing);
    return typing;
}

function setChatPending(isPending) {
    chatIsResponding = isPending;
    chatInput?.toggleAttribute("disabled", isPending);
    chatSend?.toggleAttribute("disabled", isPending);
    chatQuickActions.forEach((button) => button.toggleAttribute("disabled", isPending));
}

function sendChatMessage(rawMessage) {
    const message = rawMessage.trim();

    if (!message || chatIsResponding) {
        return;
    }

    createChatMessage("user", message);

    if (chatInput) {
        chatInput.value = "";
    }

    setChatPending(true);
    const typing = createTypingIndicator();
    scrollChatToBottom();

    window.setTimeout(() => {
        typing.remove();
        createChatMessage("bot", getChatResponse(message));
        setChatPending(false);
        scrollChatToBottom();

        if (chatPanel?.classList.contains("is-visible")) {
            chatInput?.focus();
        }
    }, reducedMotion.matches ? 0 : 650);
}

chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChatMessage(chatInput?.value ?? "");
});

chatQuickActions.forEach((button) => {
    button.addEventListener("click", () => {
        sendChatMessage(button.dataset.chatMessage ?? "");
    });
});

function clearActivePhoto() {
    servicesCollage?.classList.remove("has-active");
    interactivePhotos.forEach((photo) => {
        photo.classList.remove("is-active");
        photo.setAttribute("aria-pressed", "false");
    });
}

interactivePhotos.forEach((photo) => {
    photo.addEventListener("click", () => {
        const shouldActivate = !photo.classList.contains("is-active");

        clearActivePhoto();

        if (shouldActivate) {
            servicesCollage.classList.add("has-active");
            photo.classList.add("is-active");
            photo.setAttribute("aria-pressed", "true");
        }
    });
});

floatingTrigger?.addEventListener("click", () => {
    const isOpen = floatingContact.classList.toggle("is-open");
    floatingTrigger.setAttribute("aria-expanded", String(isOpen));
});

function setActiveNavigation(hash) {
    sectionLinks.forEach((link) => {
        const isActive = link.hash === hash;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.hash);

        if (!target || !contentFrame) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: reducedMotion.matches ? "auto" : "smooth",
            block: "start"
        });
        setActiveNavigation(link.hash);
        history.replaceState(null, "", link.hash);
    });
});

let navigationFrame;

contentFrame?.addEventListener("scroll", () => {
    if (navigationFrame) {
        return;
    }

    navigationFrame = requestAnimationFrame(() => {
        const frameTop = contentFrame.getBoundingClientRect().top;
        let currentHash = "#inicio";

        sectionLinks.forEach((link) => {
            const section = document.querySelector(link.hash);

            if (section && section.getBoundingClientRect().top <= frameTop + 140) {
                currentHash = link.hash;
            }
        });

        setActiveNavigation(currentHash);
        navigationFrame = null;
    });
}, { passive: true });

function closeChat({ restoreFocus = false } = {}) {
    chatPanel?.classList.remove("is-visible");
    chatPanel?.setAttribute("aria-hidden", "true");
    chatbotButton?.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
        chatbotButton?.focus();
    }
}

chatbotButton?.addEventListener("click", () => {
    const willOpen = !chatPanel?.classList.contains("is-visible");

    if (!willOpen) {
        closeChat();
        return;
    }

    chatPanel.classList.add("is-visible");
    chatPanel.setAttribute("aria-hidden", "false");
    chatbotButton.setAttribute("aria-expanded", "true");
    floatingContact?.classList.remove("is-open");
    floatingTrigger?.setAttribute("aria-expanded", "false");
    chatInput?.focus();
});

chatClose?.addEventListener("click", () => closeChat({ restoreFocus: true }));

document.addEventListener("click", (event) => {
    if (servicesCollage && !servicesCollage.contains(event.target)) {
        clearActivePhoto();
    }

    if (floatingContact && !floatingContact.contains(event.target)) {
        floatingContact.classList.remove("is-open");
        floatingTrigger.setAttribute("aria-expanded", "false");
    }

    if (chatPanel?.classList.contains("is-visible") &&
        !chatPanel.contains(event.target) &&
        !chatbotButton?.contains(event.target)) {
        closeChat();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    clearActivePhoto();
    floatingContact?.classList.remove("is-open");
    floatingTrigger?.setAttribute("aria-expanded", "false");
    closeChat({ restoreFocus: chatPanel?.classList.contains("is-visible") });
});
