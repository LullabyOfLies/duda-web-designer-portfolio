
    <style>
      .testimonial-wall-testimonials-6z5uy6s92 {
        width: 100%;
        background-color: transparent;
        padding: 20px 0;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        /* Vertical gap between rows */
        gap: 24px;
      }

      .scroll-row-testimonials-6z5uy6s92 {
        display: flex;
        width: max-content;
        position: relative;
        z-index: 1;
        /* Padding to prevent shadow/transform clipping from the row container */
        padding: 24px 0;
        /* Counteract padding to keep visual gap consistent */
        margin-top: -24px;
        margin-bottom: -24px;
        transition: z-index 0s;
      }

      .scroll-row-testimonials-6z5uy6s92:hover {
        z-index: 50;
      }

      .scroll-content-testimonials-6z5uy6s92 {
        display: flex;
        /* Horizontal gap between cards */
        gap: 24px;
        /* IMPORTANT: Add padding-right equal to gap to ensure the gap is part of the 50% width calculation */
        padding-right: 24px;
      }

      .scroll-left-testimonials-6z5uy6s92 {
        animation: scroll-left-testimonials-6z5uy6s92 linear infinite;
      }

      .scroll-right-testimonials-6z5uy6s92 {
        animation: scroll-right-testimonials-6z5uy6s92 linear infinite;
      }

      
      .testimonial-wall-testimonials-6z5uy6s92:hover .scroll-row-testimonials-6z5uy6s92 {
        animation-play-state: paused;
      }
      

      @keyframes scroll-left-testimonials-6z5uy6s92 {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      @keyframes scroll-right-testimonials-6z5uy6s92 {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }

      .testimonial-card-testimonials-6z5uy6s92 {
        position: relative;
        min-width: 320px;
        width: 320px;
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        border: 1px solid #F5F5F5;
        box-shadow: 0 1px 1.25px -5px rgba(0, 0, 0, 0.1), 0 0.5px 0.5px -5px rgba(0, 0, 0, 0.04);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, box-shadow;
        /* Enforce left alignment inside card */
        text-align: left;
      }

      .testimonial-card-testimonials-6z5uy6s92:hover {
        transform: translateY(-8px);
        background-color: #FFFFFF;
        border-color: #F5F5F5;
        box-shadow: 0 3px 3.75px -5px rgba(0, 0, 0, 0.1), 0 1.5px 1.5px -5px rgba(0, 0, 0, 0.04);
      }

      .testimonial-card-testimonials-6z5uy6s92:hover .author-name-testimonials-6z5uy6s92,
      .testimonial-card-testimonials-6z5uy6s92:hover .testimonial-text-testimonials-6z5uy6s92 {
        color: #000000;
      }

      .testimonial-card-testimonials-6z5uy6s92:hover .author-handle-testimonials-6z5uy6s92,
      .testimonial-card-testimonials-6z5uy6s92:hover .platform-icon-testimonials-6z5uy6s92 {
        color: #8C8C8C;
      }

      .testimonial-card-testimonials-6z5uy6s92:hover .avatar-testimonials-6z5uy6s92 {
        border-color: #FFFFFF;
      }

      .platform-icon-testimonials-6z5uy6s92 {
        position: absolute;
        top: 16px;
        right: 16px;
        color: #8C8C8C;
        opacity: 0.6;
        transition: opacity 0.3s ease, color 0.3s ease;
      }

      .platform-icon-testimonials-6z5uy6s92:hover {
        opacity: 1;
        color: #FFFFFF;
      }

      .platform-icon-testimonials-6z5uy6s92 a {
        color: inherit;
        text-decoration: none;
      }

      .testimonial-header-testimonials-6z5uy6s92 {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
        text-align: left;
      }

      .avatar-testimonials-6z5uy6s92 {
        width: 48px;
        height: 48px;
        border-radius: 50px;
        object-fit: cover;
        border: 2px solid #FFFFFF;
        transition: border-color 0.3s ease;
      }

      .author-meta-testimonials-6z5uy6s92 {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
        text-align: left;
      }

      .author-name-testimonials-6z5uy6s92 {
        font-size: 15px;
        font-weight: 700;
        color: #000000;
        margin: 0;
        transition: color 0.3s ease;
      }

      .author-handle-testimonials-6z5uy6s92 {
        font-size: 13px;
        color: #8C8C8C;
        margin: 1px 0 0 0;
        transition: color 0.3s ease;
      }

      .testimonial-text-testimonials-6z5uy6s92 {
        font-size: 15px;
        line-height: 1.5;
        color: #000000;
        margin: 0;
        opacity: 0.9;
        transition: color 0.3s ease;
        text-align: left;
      }

      @media (max-width: 640px) {
        .testimonial-card-testimonials-6z5uy6s92 {
          min-width: 280px;
          width: 280px;
          padding: 20px;
        }
      }
    </style>

    <div class="testimonial-wall-testimonials-6z5uy6s92">
      
      <div class="scroll-row-testimonials-6z5uy6s92 scroll-left-testimonials-6z5uy6s92" style="animation-duration: 100s;">
        <div class="scroll-content-testimonials-6z5uy6s92">
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Kim" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Sarah Kim</p>
            <p class="author-handle-testimonials-6z5uy6s92">@sarahkimdesigns</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Very Good Components has completely transformed how I find design resources. The curated tools save me hours every week!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=emma" alt="Emma Johnson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Emma Johnson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@emmajcreative</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The ease of customization is what sets this apart. I can tweak every detail to match my brand perfectly.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=olivia" alt="Olivia Parker" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Olivia Parker</p>
            <p class="author-handle-testimonials-6z5uy6s92">@oliviaparkerux</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The quality of the components is exceptional. It is clear the team actually cares about performance and aesthetics.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=nina" alt="Nina Taylor" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Nina Taylor</p>
            <p class="author-handle-testimonials-6z5uy6s92">@ninataylorart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The interactive elements are so smooth. My conversion rates have actually improved since adding these to my landing pages.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Kim" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Sarah Kim</p>
            <p class="author-handle-testimonials-6z5uy6s92">@sarahkimdesigns</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Very Good Components has completely transformed how I find design resources. The curated tools save me hours every week!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=emma" alt="Emma Johnson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Emma Johnson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@emmajcreative</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The ease of customization is what sets this apart. I can tweak every detail to match my brand perfectly.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=olivia" alt="Olivia Parker" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Olivia Parker</p>
            <p class="author-handle-testimonials-6z5uy6s92">@oliviaparkerux</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The quality of the components is exceptional. It is clear the team actually cares about performance and aesthetics.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=nina" alt="Nina Taylor" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Nina Taylor</p>
            <p class="author-handle-testimonials-6z5uy6s92">@ninataylorart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The interactive elements are so smooth. My conversion rates have actually improved since adding these to my landing pages.</p>
      </div>
    </div>
        <div class="scroll-content-testimonials-6z5uy6s92">
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Kim" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Sarah Kim</p>
            <p class="author-handle-testimonials-6z5uy6s92">@sarahkimdesigns</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Very Good Components has completely transformed how I find design resources. The curated tools save me hours every week!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=emma" alt="Emma Johnson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Emma Johnson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@emmajcreative</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The ease of customization is what sets this apart. I can tweak every detail to match my brand perfectly.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=olivia" alt="Olivia Parker" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Olivia Parker</p>
            <p class="author-handle-testimonials-6z5uy6s92">@oliviaparkerux</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The quality of the components is exceptional. It is clear the team actually cares about performance and aesthetics.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=nina" alt="Nina Taylor" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Nina Taylor</p>
            <p class="author-handle-testimonials-6z5uy6s92">@ninataylorart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The interactive elements are so smooth. My conversion rates have actually improved since adding these to my landing pages.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Kim" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Sarah Kim</p>
            <p class="author-handle-testimonials-6z5uy6s92">@sarahkimdesigns</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Very Good Components has completely transformed how I find design resources. The curated tools save me hours every week!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=emma" alt="Emma Johnson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Emma Johnson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@emmajcreative</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The ease of customization is what sets this apart. I can tweak every detail to match my brand perfectly.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=olivia" alt="Olivia Parker" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Olivia Parker</p>
            <p class="author-handle-testimonials-6z5uy6s92">@oliviaparkerux</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The quality of the components is exceptional. It is clear the team actually cares about performance and aesthetics.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=nina" alt="Nina Taylor" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Nina Taylor</p>
            <p class="author-handle-testimonials-6z5uy6s92">@ninataylorart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">The interactive elements are so smooth. My conversion rates have actually improved since adding these to my landing pages.</p>
      </div>
    </div>
      </div>
    
      <div class="scroll-row-testimonials-6z5uy6s92 scroll-right-testimonials-6z5uy6s92" style="animation-duration: 100s;">
        <div class="scroll-content-testimonials-6z5uy6s92">
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Rodriguez" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Marcus Rodriguez</p>
            <p class="author-handle-testimonials-6z5uy6s92">@marcus_rodriguez</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">As a freelance designer, the high-quality code blocks have been invaluable. This library pays for itself in productivity!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Liu" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Alex Liu</p>
            <p class="author-handle-testimonials-6z5uy6s92">@alexliuart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">I discovered animations I never knew were possible with just HTML/CSS. A must-have for modern developers.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=james" alt="James Chen" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">James Chen</p>
            <p class="author-handle-testimonials-6z5uy6s92">@jameschenphoto</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Every component is a masterpiece. I have used the ticker and masonry grid on three different client sites already.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=david" alt="David Wilson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">David Wilson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@davidwilsondesign</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Best component library I have seen in years. Clean, fast, and actually beautiful by default.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Rodriguez" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Marcus Rodriguez</p>
            <p class="author-handle-testimonials-6z5uy6s92">@marcus_rodriguez</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">As a freelance designer, the high-quality code blocks have been invaluable. This library pays for itself in productivity!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Liu" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Alex Liu</p>
            <p class="author-handle-testimonials-6z5uy6s92">@alexliuart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">I discovered animations I never knew were possible with just HTML/CSS. A must-have for modern developers.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=james" alt="James Chen" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">James Chen</p>
            <p class="author-handle-testimonials-6z5uy6s92">@jameschenphoto</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Every component is a masterpiece. I have used the ticker and masonry grid on three different client sites already.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=dave" alt="David Wilson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">David Wilson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@davidwilsondesign</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Best component library I have seen in years. Clean, fast, and actually beautiful by default.</p>
      </div>
    </div>
        <div class="scroll-content-testimonials-6z5uy6s92">
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Rodriguez" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Marcus Rodriguez</p>
            <p class="author-handle-testimonials-6z5uy6s92">@marcus_rodriguez</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">As a freelance designer, the high-quality code blocks have been invaluable. This library pays for itself in productivity!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Liu" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Alex Liu</p>
            <p class="author-handle-testimonials-6z5uy6s92">@alexliuart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">I discovered animations I never knew were possible with just HTML/CSS. A must-have for modern developers.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=james" alt="James Chen" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">James Chen</p>
            <p class="author-handle-testimonials-6z5uy6s92">@jameschenphoto</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Every component is a masterpiece. I have used the ticker and masonry grid on three different client sites already.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=david" alt="David Wilson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">David Wilson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@davidwilsondesign</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Best component library I have seen in years. Clean, fast, and actually beautiful by default.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Rodriguez" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Marcus Rodriguez</p>
            <p class="author-handle-testimonials-6z5uy6s92">@marcus_rodriguez</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">As a freelance designer, the high-quality code blocks have been invaluable. This library pays for itself in productivity!</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Liu" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">Alex Liu</p>
            <p class="author-handle-testimonials-6z5uy6s92">@alexliuart</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">I discovered animations I never knew were possible with just HTML/CSS. A must-have for modern developers.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=james" alt="James Chen" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">James Chen</p>
            <p class="author-handle-testimonials-6z5uy6s92">@jameschenphoto</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Every component is a masterpiece. I have used the ticker and masonry grid on three different client sites already.</p>
      </div>
    
      <div class="testimonial-card-testimonials-6z5uy6s92">
        
        <div class="testimonial-header-testimonials-6z5uy6s92">
          <img src="https://i.pravatar.cc/150?u=david" alt="David Wilson" class="avatar-testimonials-6z5uy6s92">
          <div class="author-meta-testimonials-6z5uy6s92">
            <p class="author-name-testimonials-6z5uy6s92">David Wilson</p>
            <p class="author-handle-testimonials-6z5uy6s92">@davidwilsondesign</p>
          </div>
        </div>
        <p class="testimonial-text-testimonials-6z5uy6s92">Best component library I have seen in years. Clean, fast, and actually beautiful by default.</p>
      </div>
    </div>
      </div>
    
    </div>
  