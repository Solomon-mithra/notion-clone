import React from 'react'
import { motion } from 'framer-motion'
import stringToColor from '@/lib/stringToColor'

function FollowPointer({
    x,
    y,
    info,
}: {
    x: number
    y: number
    info: { name: string; email: string; avatar: string | null }
}) {
    const color = stringToColor(info.email || '1')
    
    return (
        <motion.div
            className="h-4 w-4 rounded-full absolute z-50"
            style={{
                pointerEvents: 'none',
                left: x,
                top: y,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
        >
            {/* Notion-style collaborative cursor */}
            {/* <svg width="32" height="32" viewBox="0 0 32 32" style={{ pointerEvents: 'none' }}>
                <circle cx="16" cy="16" r="12" fill={color} stroke="#fff" strokeWidth="3" />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path fill="#FFF" stroke="#000" stroke-width="2" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path></svg>
            <div
                style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: color,
                    color: "black",
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    whiteSpace: 'nowrap',
                    
                }}
            >
                <motion.div>
                    {info?.name || info?.email}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default FollowPointer
