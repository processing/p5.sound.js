/**
 *  @module Sound
 *  @submodule Sound Utilities
 *  @for sound
 */

export const P5SoundUtils =
{
    clamp(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    },
}
