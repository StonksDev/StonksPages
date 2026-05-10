'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface Particle {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    duration: number;
    delay: number;
}

interface StonksConfettiProps {
    trigger: boolean;
    onComplete?: () => void;
    originElement?: React.RefObject<HTMLElement | HTMLButtonElement | null>;
}

export const StonksConfetti: React.FC<StonksConfettiProps> = ({
    trigger,
    onComplete,
    originElement,
}) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const onCompleteRef = useRef(onComplete);
    const previousTriggerRef = useRef(false);

    // Update the ref when onComplete changes
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // Only generate particles when trigger changes from false to true
        if (!trigger || previousTriggerRef.current === trigger) {
            previousTriggerRef.current = trigger;
            return;
        }

        previousTriggerRef.current = trigger;

        // Generate particles with random properties
        const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => {
            // Random angle for spread (360 degrees)
            const angle = (Math.PI * 2 * i) / 50 + (Math.random() - 0.5) * 0.5;
            // Random distance (300-700px for more dramatic spread)
            const distance = 300 + Math.random() * 400;
            
            return {
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - Math.random() * 150, // More upward bias
                rotation: Math.random() * 1080 - 540, // More rotation: -540 to 540 degrees
                scale: 0.7 + Math.random() * 0.6, // Scale between 0.7 and 1.3
                duration: 2.5 + Math.random() * 1.5, // Longer duration: 2.5s to 4s
                delay: Math.random() * 0.2, // Slightly more delay variance
            };
        });

        // Defer state update to avoid cascading renders
        const animationFrame = requestAnimationFrame(() => {
            setParticles(newParticles);
        });

        // Cleanup after longest animation completes
        const maxDuration = Math.max(...newParticles.map(p => p.duration + p.delay));
        const cleanupTimer = setTimeout(() => {
            setParticles([]);
            onCompleteRef.current?.();
        }, maxDuration * 1000 + 100);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(cleanupTimer);
        };
    }, [trigger]);

    // Only render on client-side and when particles exist
    if (typeof window === 'undefined' || particles.length === 0) return null;

    // Calculate origin position
    let originX = '50%';
    let originY = '50%';
    
    if (originElement?.current) {
        const rect = originElement.current.getBoundingClientRect();
        originX = `${rect.left + rect.width / 2}px`;
        originY = `${rect.top + rect.height / 2}px`;
    }

    return createPortal(
        <div
            className="fixed inset-0 pointer-events-none z-9999"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        >
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: originX,
                        top: originY,
                        width: '40px',
                        height: '40px',
                        transform: 'translate(-50%, -50%)',
                        willChange: 'transform, opacity',
                        animation: `confetti-burst-${particle.id} ${particle.duration}s ease-out ${particle.delay}s forwards`,
                    }}
                >
                    <Image
                        src="/images/stonksguy-small.webp"
                        alt="Stonksguy"
                        fill
                        sizes="40px"
                        style={{
                            objectFit: 'contain',
                        }}
                        unoptimized
                    />
                    <style jsx>{`
                        @keyframes confetti-burst-${particle.id} {
                            0% {
                                transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1);
                                opacity: 1;
                            }
                            100% {
                                transform: translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg) scale(${particle.scale * 0.5});
                                opacity: 0;
                            }
                        }
                    `}</style>
                </div>
            ))}
        </div>,
        document.body
    );
};
