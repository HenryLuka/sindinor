import{A as o}from"./api-DzKqrs3b.js";class n{static async init(){const t=new URLSearchParams(window.location.search).get("id");if(!t){window.location.href="index.html";return}await this.renderPartnerDetails(t)}static async renderPartnerDetails(e){const a=(await o.getPartners()).find(i=>i.id===e),r=document.getElementById("partner-content");if(!a||!r){r.innerHTML=`
                <div class="text-center py-20">
                    <h2 class="text-3xl font-bold text-white mb-4">Parceiro não encontrado</h2>
                    <a href="/" class="text-accent-cyan hover:underline">Voltar para a Home</a>
                </div>
            `;return}const s=a.video_url&&a.video_url!=="#"?`
            <div class="bg-glass-bg border border-glass-border rounded-2xl overflow-hidden shadow-2xl group">
                <div class="aspect-video relative">
                    <iframe 
                        src="${this.formatYoutubeUrl(a.video_url)}" 
                        class="absolute inset-0 w-full h-full" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            `:`
            <div class="bg-glass-bg border border-glass-border rounded-2xl p-12 flex flex-col items-center justify-center text-text-muted gap-4">
                <i class="fas fa-video-slash text-5xl opacity-20"></i>
                <p class="font-bold uppercase tracking-widest text-xs">Vídeo não disponível</p>
            </div>
            `;r.innerHTML=`
            <div class="flex flex-col gap-12 animate-fade-in-up">
                <!-- Top Brand Header -->
                <div class="bg-secondary-dark border border-glass-border p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 hover:border-accent-cyan transition-colors group">
                    <img src="${a.logo||"assets/favicon.png"}" alt="${a.name}" class="h-24 w-auto object-contain bg-white/5 p-4 rounded-xl border border-white/10 group-hover:scale-105 transition-transform">
                    <div class="text-center md:text-left">
                        <span class="text-accent-cyan font-bold uppercase tracking-widest text-xs mb-2 block">Mantenedor Parceiro</span>
                        <h1 class="font-heading font-black text-4xl md:text-5xl text-white tracking-tighter">${a.name}</h1>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <!-- Description -->
                    <div class="space-y-8 order-2 lg:order-1">
                        <div class="prose prose-invert max-w-none">
                            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Sobre o Parceiro
                            </h2>
                            <p class="text-gray-400 leading-relaxed text-lg">
                                ${a.description||"Este parceiro ainda não possui uma descrição detalhada."}
                            </p>
                        </div>

                        <div class="pt-8 border-t border-glass-border">
                            <a href="index.html#associe-se" class="inline-flex items-center gap-3 bg-accent-cyan text-primary-dark font-black py-4 px-8 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-accent-cyan/20">
                                <i class="fas fa-handshake"></i> Seja um Associado SINDINOR
                            </a>
                        </div>
                    </div>

                    <!-- Media / Video -->
                    <div class="order-1 lg:order-2 sticky top-24">
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Vídeo em Destaque
                        </h2>
                        ${s}
                    </div>
                </div>
            </div>
        `}static formatYoutubeUrl(e){if(!e)return"";if(e.includes("embed"))return e;let t="";return e.includes("v=")?t=e.split("v=")[1].split("&")[0]:e.includes("youtu.be/")&&(t=e.split("youtu.be/")[1].split("?")[0]),t?`https://www.youtube.com/embed/${t}`:e}}document.addEventListener("DOMContentLoaded",()=>{n.init()});
